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
            const response = await fetch('http://hp-api.greatidea.dev/api/users/me', {
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
            const response = await fetch('https://hp-api.greatidea.dev/api/questions/', {
                method: 'GET' 
            });
            if (response.ok) {
                const data = await response.json();
                questions = data.data;
            } else {
                console.log(response);
                alert(response.status + ': Error retrieving questions.');
            }
        } catch (error) {
            console.error(error);
        }
    }
</script>
<section class="flex flex-col items-center justify-center flex-1 w-full gap-12 py-16">

    {#if questions.length > 0}
        <a href="/add-multichoice" class="btn btn-primary btn-xs sm:btn-sm md:btn-md lg:btn-lg">Add Multiple Choice Question</a>
        <a href="/add-truefalse" class="btn btn-primary btn-xs sm:btn-sm md:btn-md lg:btn-lg">Add True/False Question</a>
        <a href="/add-multichoice" class="btn btn-disabled btn-xs sm:btn-sm md:btn-md lg:btn-lg">Add Multiple Select Question</a>
        <span class="text-xl">Total Number of Questions Added: {questions.length}</span>
        <!-- {#each questions as question}
            <div class="flex flex-col items-center justify-center w-full gap-4">
                <h1 class="text-xl">{question.question}</h1>
                <div class="flex flex-col items-center justify-center w-full gap-2">
                    {#each question.answers as answer}
                        <button class="btn btn-primary btn-xs sm:btn-sm md:btn-md lg:btn-lg">{answer}</button>
                    {/each}
                </div>
            </div>
        {/each} -->
    {:else}
        <h1 class="text-xl">Loading...</h1>
    {/if}
</section>