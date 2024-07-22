<script>
    import { useForm, email, required, minLength } from "svelte-use-form";
    import { token } from "../../store";
	import { onMount } from "svelte";
	import { goto } from "$app/navigation";

    const form = useForm({
		email: { validators: [required, email]},
		password: { validators: [required, minLength(8)]}
	});

	let showSubmit = false;

    function onSubmit() {
        showSubmit = true;
		submitForm();
	}

    async function submitForm() {
        try {
            const response = await fetch('https://hp-api.greatidea.dev/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify($form.values)
            });

            if (response.ok) {
                const data = await response.json();
                token.set(data.token);
                goto('/dashboard');
            } else {
                console.log(response.status, response.statusText); 
                alert(response.status + ': Invalid email or password. Please try again.');
                showSubmit = false;
            }
        } catch (error) {
            console.error(error);
        }
    }

    onMount(() => {
        getUser();
    });

    const newToken = $token;

    async function getUser() {
        try {
            const response = await fetch('https://hp-api.greatidea.dev/api/users/me', {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + newToken
                }
            });

            if (response.ok) {
                goto('/dashboard');
            } else {
                console.log(response);
            }
        } catch (error) {
            console.error(error);
        }
    }

</script>

<section class="flex flex-col items-center justify-start flex-1 w-full gap-12 py-16">
    <div class="flex flex-col items-center justify-center gap-2">
        <h1 class="text-2xl font-medium text-primary">Admin Login</h1>
        <p>Enter your email and password to login.</p>
        <a class="font-medium link link-accent" href="/">If you do not have a login, click here to return to the home screen.</a>
    </div>
    {#if !showSubmit}
        <form use:form on:submit|preventDefault={onSubmit} class="flex flex-col items-center justify-center gap-6 gap">
            <div class="flex flex-col items-center justify-center gap-1">
                <label class="flex items-center gap-2 input input-bordered">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    class="w-4 h-4 opacity-70">
                    <path
                    d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                    <path
                    d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                </svg>
                <input type="text" id="email" name="email" class="grow" placeholder="Email" />
                </label>
                <div class="w-full text-sm text-error"  hidden={$form.email.valid}>
                    <p>Email is not valid.</p>
                </div>
            </div>

            <div class="flex flex-col items-center justify-center gap-1">
                <label class="flex items-center gap-2 input input-bordered">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    class="w-4 h-4 opacity-70">
                    <path
                    fill-rule="evenodd"
                    d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                    clip-rule="evenodd" />
                </svg>
                <input type="password" id="password" name="password" class="grow" placeholder="Password" />
                </label>
                <div class="w-full text-sm text-error" hidden={$form.password.valid}>
                    <p>Password is required.</p>
                </div>
            </div>

            <button type="submit" class="btn btn-primary btn-wide" disabled={!$form.valid}>Login</button>
        </form>
    {/if}

    {#if showSubmit}
        <div class="flex flex-col items-center justify-center gap-4">
            <p class="text-2xl font-medium text-primary">Please wait...</p>
            <span class="loading loading-infinity text-primary loading-lg"></span>
        </div>
    {/if}
</section>