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

    type Source = {
        id: string;
        order: number;
        source: string;
        citation: string;
        topic: string;
        active: string;
        completed: string;
        created_at: string;
        updated_at: string;
    }

	onMount(() => {
		getUser();
	    fetchAvailableTags();
        getQuestionOrigins();
	});

    let questionOrigins: Source[] = [];

    async function getQuestionOrigins() {
        try {
            const response = await fetch('https://hp-api.greatidea.dev/api/sources/topic?topic=Harry Potter', {
                method: 'GET' 
            });
            if (response.ok) {
                const data = await response.json();
                // set sources = data.data and sort by data.order
                questionOrigins = data.data.sort((a: Source, b: Source) => a.order - b.order);
            } else {
                alert(response.status + ': Error retrieving questions.');
            }
        } catch (error) {
            console.error(error);
        }
    }

    $: questionOriginsActive = questionOrigins.filter((origin) => origin.active === "true");

    let availableTags: string[] = [];

	async function fetchAvailableTags() {
		try {
			const response = await fetch(`https://hp-api.greatidea.dev/api/questions/tags`, {
				method: 'GET'
			});
			if (response.ok) {
				const data = await response.json();
				data.data = data.data.filter((tag: string) => tag !== '');
				availableTags = data.data;
			} else {
				alert(response.status + ': Error retrieving tags.');
			}
		} catch (error) {
			console.error(error);
		}
	}

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
            const response = await fetch('https://hp-api.greatidea.dev/api/questions/topic?topic=Harry Potter', {
                method: 'GET' 
            });
            if (response.ok) {
                const data = await response.json();
                questions = data.data;
            } else {
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
    let filter: HTMLSelectElement | string;
    let filteredQuestions = questions;

    $: filteredQuestions = questions.filter((question) => {
        if (filter === 'all') {
            return true;
        } else {
            return question.question_origin === filter;
        }
    }).sort((a, b) => {
        return a.created_at.localeCompare(b.created_at);
    });

    let tagFilter: string;
    
    $: filteredQuestions = questions.filter((question) => {
        if (tagFilter === 'all') {
            return true;
        } else {
            return question.tags.includes(tagFilter);
        }
    }).sort((a, b) => {
        return a.created_at.localeCompare(b.created_at);
    });
</script>
<section class="flex items-center justify-center font-medium text-secondary">
    <div class="flex flex-col items-center justify-center flex-1 max-w-4xl gap-6">
        {#if questions && questions.length > 0}
            <div class="flex flex-row flex-wrap items-center justify-center gap-4">
                <a href="/dashboard" class="btn btn-primary text-base-100 btn-wide">Dashboard</a>
                <a href="/sources" class="btn btn-primary text-base-100 btn-wide">Sources</a>
            </div>
            <div class="flex flex-row flex-wrap items-center justify-center gap-4">
                <select class="select select-bordered select-primary select-sm" bind:value={filter}>
                    <option value="all">All</option>
                    {#each questionOriginsActive as source}
                        <option value={source.source}>{source.source}</option>
                    {/each}
                </select>
            </div>
            <div class="flex flex-row flex-wrap items-center justify-center gap-4">
                <select class="select select-bordered select-primary select-sm" bind:value={tagFilter}>
                    <option value="all">All</option>
                    {#each availableTags as tag}
                        <option value={tag}>{tag}</option>
                    {/each}
                </select>
            </div>
            <div class="flex flex-row items-center justify-center">
                <div class="flex flex-row items-center justify-center gap-2">
                    <div class="text-xl font-medium collapse-title text-primary">Number of questions: {filteredQuestions.length}</div>
                </div>
            </div>
            <div class="w-full join join-vertical">
                {#each filteredQuestions as question, i}
                    <div class="flex flex-row items-start justify-start gap-2">
                        {#if tagFilter && filter && (filter !== 'all' || tagFilter !== 'all')}
                            <span class="w-10 ml-10 text-xl">{i + 1}.</span>
                        {/if}
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
                                        <span class="text-primary">{question.correct_answer.split('\n').join(', ')}</span>
                                    </div>
                                </div>
                                <div class="flex flex-row gap-4">
                                    <p class="text-tertiary">Difficulty:</p>
                                    <div class="flex flex-row items-center justify-start gap-1">
                                        {#if question.difficulty}
                                            <span class={question.difficulty < 26 ? `text-error` : question.difficulty < 76 ? `text-warning` : `text-success`}>{100 - question.difficulty}</span>
                                        {:else}
                                            <span class="text-primary">No Data</span>
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
                                <div class="flex flex-row gap-4">
                                    <p class="text-tertiary">Dislikes:</p>
                                    <div class="flex flex-row items-center justify-start gap-1">
                                        {#if question.likes}
                                            <span class="text-error">{question.likes}</span>
                                        {:else}
                                            <span class="text-primary">0</span>
                                        {/if}
                                    </div>
                                </div>
                                <div class="flex flex-row items-center justify-end w-full"><button on:click={handleEditClick(question)} class="btn btn-primary btn-sm text-base-100">Edit</button></div>
                            </div>
                        </div>
                    </div>
                {/each}
            </div>
        {:else}
            <h1 class="text-xl">Loading...</h1>
        {/if}
    </div>
</section>