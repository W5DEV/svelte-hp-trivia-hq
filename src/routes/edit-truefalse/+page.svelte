<script lang="ts">
	import { onMount } from 'svelte';
	import { token, current_question } from '../../store';
	import { goto } from '$app/navigation';
	import { required, useForm } from 'svelte-use-form';
	import { question_origins } from '../../sources';

    const questionOrigins = question_origins;

    const questionOriginsActive = questionOrigins.filter((origin) => origin.active);


	let newToken = $token;
	let question = $current_question;
	
	onMount(() => {
		newToken = $token;
		question = $current_question;
		if (!newToken) {
			goto('/login');
		}
		if (!question) {
			goto('/dashboard');
		}
		getUser();
	});


	async function getUser() {
		try {
			const response = await fetch('https://hp-api.greatidea.dev/api/users/me', {
				method: 'GET',
				headers: {
					Authorization: 'Bearer ' + newToken
				}
			});
			if (response.ok) {
				console.log('User is logged in');
			} else {
				token.set('');
				goto('/login');
			}
		} catch (error) {
			console.error(error);
		}
	}

	const form = useForm({
		question: { validators: [required] },
		source: { validators: [required]},
		tags: { validators: [required]},
		difficulty: { validators: [required]},
		correct_answer: { validators: [required] },
        completed: { validators: [] }, 
        question_origin: { validators: [required]}
	});

	$form.source.value = question ? question.source : '';
	$form.tags.value = question ? question.tags.join(', ') : '';
	$form.difficulty.value = question ? question.difficulty : '';
	$form.correct_answer.value = question ? question.correct_answer : '';
    $form.question_origin.value = question ? question.question_origin : '';

	let showSubmit = false;

	function onSubmit() {
		showSubmit = true;
		submitForm();
	}

	async function submitForm() {
		const questionValues = {
			question: $form.question.value,
			answers: ["True", "False"],
			source: $form.source.value,
			tags: $form.tags.value.split(',').map((tag) => tag.trim()),
			type: 'true-false',
			difficulty: $form.difficulty.value,
			correct_answer: $form.correct_answer.value,
            completed: $form.completed.value ? 'true' : 'false',
            question_origin: $form.question_origin.value
		};
		try {
			const response = await fetch(`https://hp-api.greatidea.dev/api/questions/${question?.id}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + newToken
				},
				body: JSON.stringify(questionValues)
			});

			if (response.ok) {
				const data = await response.json();
				console.log(data);
				console.log('Question updated successfully!');
				setTimeout(() => {
					goto('/dashboard');
				}, 1000);
			} else {
				console.log(response.status, response.statusText);
				alert(response.status + ': Invalid data. Please try again.');
			}
		} catch (error) {
			console.error(error);
		}
	}
</script>

<section class="flex flex-col items-center justify-center flex-1 w-full gap-12 py-16">
    <h1 class="text-2xl font-medium text-primary">Edit Question</h1>
	{#if !showSubmit}
		<form
			use:form
			on:submit|preventDefault={onSubmit}
			class="flex flex-col items-center justify-center w-full gap-6"
		>
			<div class="flex flex-col items-center justify-center w-full max-w-3xl gap-4 px-8 md:px-12">
				<div class="flex flex-col items-center justify-center w-full">
                    <input
                        type="text"
                        id="question"
                        name="question"
                        class="w-full input input-bordered"
                        placeholder="Question"
						value={question?.question}
                    />
                    <div class="w-full text-sm text-error" hidden={$form.question?.valid}>
                        <p>Question is required.</p>
                    </div>
                </div>
				<div class="flex flex-col items-center justify-center w-full">
                    <select
                        id="source"
                        name="source"
                        class="w-full select select-bordered"
                        placeholder="Select a source"
                    >
                        <option disabled>Select a Source</option>
                        <option selected={question?.source === "book"} value="book">Book</option>
                        <option selected={question?.source === "movie"} value="movie">Movie</option>
                        <option selected={question?.source === "pottermore"} value="pottermore">Pottermore</option>
                        <option selected={question?.source === "other"} value="other">Other</option>
                    </select>
                    <div class="w-full text-sm text-error" hidden={$form.source.valid}>
                        <p>Source is required.</p>
                    </div>
                </div>

				<div class="flex flex-col items-center justify-center w-full">
                    <input
                        type="text"
                        id="tags"
                        name="tags"
                        class="w-full input input-bordered"
                        placeholder="Tags"
						value={question?.tags.join(', ')}
                    />
                    <div class="w-full text-sm text-error" hidden={$form.tags.valid}>
                        <p>Tags are required. Separate tags via comma.</p>
                    </div>
                </div>

				<div class="flex flex-col items-center justify-center w-full">
                    <select
                        id="difficulty"
                        name="difficulty"
                        class="w-full input input-bordered"
                        placeholder="Select a difficulty"
                    >
                        <option selected disabled>Select a difficulty</option>
                        <option selected={question?.difficulty === "easy"} value="easy">Easy</option>
                        <option selected={question?.difficulty === "medium"} value="medium">Medium</option>
                        <option selected={question?.difficulty === "hard"} value="hard">Hard</option>
                    </select>
                    <div class="w-full text-sm text-error" hidden={$form.difficulty.valid}>
                        <p>Difficulty is required.</p>
                    </div>
                </div>

				<div class="flex flex-col items-center justify-center w-full">
                    <select
                        id="correct_answer"
                        name="correct_answer"
                        class="w-full input input-bordered"
                    >
                        <option disabled>Select The Correct Answer</option>
                        <option selected={question?.correct_answer === "True"} value="True">True</option>
                        <option selected={question?.correct_answer === "False"} value="False">False</option>
                    </select>
                    <div class="w-full text-sm text-error" hidden={$form.correct_answer.valid}>
                        <p>Correct answer is required.</p>
                    </div>
                </div>
				
				<select
                    id="question_origin"
                    name="question_origin"
                    class="w-full select select-bordered"
                    placeholder="Select a question origin"
                >
                    <option disabled>Select a Question Origin</option>
                    {#each questionOriginsActive as origin}
                        <option selected={question?.question_origin === origin.name} value={origin.name}>{origin.name}</option>
                    {/each}
                </select>
                <div class="w-full text-sm text-error" hidden={$form.question_origin.valid}>
                    <p>Question origin is required.</p>
                </div>

                <div class="flex flex-col items-center justify-center w-full">
                    <div class="flex flex-row items-center justify-center w-full gap-4">
                        <label for="completed">Completed?</label>
                        <input type="checkbox" class="toggle toggle-success"
                            id="completed"
                            name="completed"
							checked={question?.completed === 'true'}
                        />
                    </div>
                </div>
			</div>

			<button type="submit" class="btn btn-primary btn-wide" disabled={!$form.valid}>Save</button>
			<button class="btn btn-primary btn-wide" on:click={() => (showSubmit = true)}>Cancel</button>
		</form>
	{/if}
	{#if showSubmit}
		<div class="flex flex-col items-center justify-center gap-4">
			<h1 class="text-xl">Question updated successfully!</h1>
			<p class="text-base">Redirecting...</p>
		</div>
	{/if}
</section>
