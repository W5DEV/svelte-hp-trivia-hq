<script lang="ts">
	import { onMount } from "svelte";
	import { token, current_question } from "../../store";
	import { goto } from "$app/navigation";

   type Question = {
        id: string;
        question: string;
        answers: string[];
        source: string;
        tags: string[];
        type: string;
        difficulty: number;
        amount_correct: number;
        amount_seen: number;
        likes: number;
        correct_answer: string;
        question_origin: string;
        completed: string;
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
            const response = await fetch('https://hp-api.greatidea.dev/api/users/me', {
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
                questions = data.data.sort((a: Question, b: Question) => {
                    return a.created_at > b.created_at ? -1 : 1;
                })
            } else {
                console.log(response);
                alert(response.status + ': Error retrieving questions.');
            }
        } catch (error) {
            console.error(error);
        }
    }

    function handleEditClick(question: Question) {
        return () => {
            current_question.set(question);
            if (question.type === 'multi-choice') {
                goto('/edit-multichoice');
            } else if (question.type === 'true-false') {
                goto('/edit-truefalse');
            } else if (question.type === 'multi-select') {
                goto('/edit-multiselect');
            }
        }
    }
</script>
<section class="flex flex-col items-center justify-center flex-1 w-full gap-12 py-16">

    {#if questions.length > 0}
        <a href="/add-multichoice" class="btn btn-primary text-base-100 btn-xs sm:btn-sm md:btn-md lg:btn-lg">Add Multiple Choice Question</a>
        <a href="/add-truefalse" class="btn btn-primary text-base-100 btn-xs sm:btn-sm md:btn-md lg:btn-lg">Add True/False Question</a>
        <a href="/add-multiselect" class="btn btn-primary text-base-100 btn-xs sm:btn-sm md:btn-md lg:btn-lg">Add Multiple Select Question</a>
        <a href="/sources" class="btn btn-primary text-base-100 btn-xs sm:btn-sm md:btn-md lg:btn-lg">Sources</a>
        <span class="text-xl font-bold text-secondary">Total Number of Questions Added: {questions.length}</span>


<div class="w-full join join-vertical">
    {#each questions as question}
        <div class="border collapse collapse-arrow join-item border-base-300">
            <input type="radio" name="my-accordion-4" />
                <div class={question.completed === "true" ? `text-xl font-medium collapse-title text-success` : `text-xl font-medium collapse-title text-error`}>{question.question}</div>
            <div class="flex flex-col gap-3 collapse-content">
                <div class="flex flex-col">
                    <p class="text-tertiary">Answers:</p>
                    {#each question.answers as answer, i}
                        <div class="flex flex-row items-center justify-start gap-1">
                            <span class="text-primary">{i + 1}. </span>
                            <span class="text-primary">{answer}</span>
                        </div>
                    {/each}
                </div>
                <div class="flex flex-col">
                    <p class="text-tertiary">Tags:</p>
                    <div class="flex flex-row items-center justify-start gap-1">
                        {#each question.tags as tag}
                                <span class="text-primary">{tag},</span>
                        {/each}
                    </div>
                </div>
                <div class="flex flex-col">
                    <p class="text-tertiary">Source:</p>
                    <div class="flex flex-row items-center justify-start gap-1">
                        <span class="text-primary">{question.source}</span>
                    </div>
                </div>
                <div class="flex flex-col">
                    <p class="text-tertiary">Question Origin:</p>
                    <div class="flex flex-row items-center justify-start gap-1">
                        <span class="text-primary">{question.question_origin}</span>
                    </div>
                </div>
                <div class="flex flex-col">
                    <p class="text-tertiary">Correct Answer:</p>
                    <div class="flex flex-row items-center justify-start gap-1">
                        <span class="text-primary">{question.correct_answer}</span>
                    </div>
                </div>
                <div class="flex flex-row gap-4">
                    <p class="text-tertiary">Difficulty:</p>
                    <div class="flex flex-row items-center justify-start gap-1">
                        {#if question.difficulty}
                            <span class={question.difficulty < 26 ? `text-error` : question.difficulty < 76 ? `text-warning` : `text-success`}>{100 - question.difficulty}</span>
                        {:else}
                            <span class="text-neutral">No Data</span>
                        {/if}
                    </div>
                </div>
                <div class="flex flex-row gap-4">
                    <p class="text-tertiary">Likes:</p>
                    <div class="flex flex-row items-center justify-start gap-1">
                        {#if question.likes}
                            <span class="text-success">{question.likes}</span>
                        {:else}
                            <span class="text-error">0</span>
                        {/if}
                    </div>
                </div>
                <div class="flex flex-row items-center justify-end w-full"><button on:click={handleEditClick(question)} class="btn btn-primary btn-sm text-base-100">Edit</button></div>
            </div>
        </div>
    {/each}
</div>
    {:else}
        <h1 class="text-xl">Loading...</h1>
    {/if}
</section>