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
        <a href="/add-multiselect" class="btn btn-primary btn-xs sm:btn-sm md:btn-md lg:btn-lg">Add Multiple Select Question</a>
        <span class="text-xl">Total Number of Questions Added: {questions.length}</span>


<div class="w-full join join-vertical">
    {#each questions as question}
        <div class="border collapse collapse-arrow join-item border-base-300">
            <input type="radio" name="my-accordion-4" />
            <div class="text-xl font-medium collapse-title">{question.question}</div>
            <div class="flex flex-col gap-2 collapse-content">
                {#each question.answers as answer, i}
                    <div class="flex flex-row items-center justify-start gap-1">
                        <span class="text-primary">{i + 1}. </span>
                        <span class="text-primary">{answer}</span>
                    </div>
                {/each}
            </div>
        </div>
    {/each}
</div>
    {:else}
        <h1 class="text-xl">Loading...</h1>
    {/if}
</section>