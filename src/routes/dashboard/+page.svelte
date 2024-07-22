<script lang="ts">
	import { onMount } from "svelte";
	import { token } from "../../store";
	import { goto } from "$app/navigation";

   type Question = {
        id: string;
        question: string;
        answers: string[];
        source: string;
        tags: string[];
        type: string;
        updated_at: string;
        created_at: string;
    }

    onMount(() => {
        getUser();
    });

    const newToken = $token;

    let questions: Question[] = [];

    async function getUser() {
        try {
            const response = await fetch('http://localhost:33500/api/users/me', {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + newToken
                }
            });
            if (response.ok) {
                getQuestions()
            } else {
                token.set('');
                goto('/login');
            }
        } catch (error) {
            console.error(error);
        }
    }

    async function getQuestions() {
        try {
            const response = await fetch('http://localhost:33500/api/questions', {
                method: 'GET',
                headers: {
                }   
            });
            if (response.ok) {
                const data = await response.json();
                questions = data.data;
                console.log(questions);
            } else {
                console.log(response.status, response.statusText);
            }
        } catch (error) {
            console.error(error);
        }
    }
</script>
<section class="flex flex-col justify-center items-center w-full flex-1 gap-12 py-16">
    {#if questions.length > 0}
        {#each questions as question}
            <div class="flex flex-col justify-center items-center w-full gap-4">
                <h1 class="text-xl">{question.question}</h1>
                <div class="flex flex-col justify-center items-center w-full gap-2">
                    {#each question.answers as answer}
                        <button class="btn btn-primary btn-xs sm:btn-sm md:btn-md lg:btn-lg">{answer}</button>
                    {/each}
                </div>
            </div>
        {/each}
    {:else}
        <h1 class="text-xl">Loading...</h1>
    {/if}
</section>