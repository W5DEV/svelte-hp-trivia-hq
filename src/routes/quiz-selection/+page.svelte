<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { questions, sources } from '../../store';
	import type { Source } from '../../store';

	onMount(() => {
        if ($sources.length === 0) {
            getQuestionOrigins();
        }
    });

    async function getQuestionOrigins() {
        try {
            const response = await fetch('https://hp-api.greatidea.dev/api/sources/topic?topic=Harry Potter', {
                method: 'GET' 
            });
            if (response.ok) {
                const data = await response.json();
                // set sources = data.data and sort by data.order
                sources.set(data.data.sort((a: Source, b: Source) => a.order - b.order).filter((origin: Source) => origin.status === "completed"));
            } else {
                alert(response.status + ': Error retrieving questions.');
            }
        } catch (error) {
            console.error(error);
        }
	}

	$questions = [];

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

	fetchAvailableTags();

	async function getQuestionsByTag(tag: string) {
		try {
			const response = await fetch(`https://hp-api.greatidea.dev/api/questions/tag?tag=${tag}`, {
				method: 'GET'
			});
			if (response.ok) {
				const data = await response.json();
				$questions = data.data;
				goto('/trivia-layout');
			} else {
				alert(response.status + ': Error retrieving questions.');
			}
		} catch (error) {
			console.error(error);
		}
	}

	async function handleQuizClick(quizName: string) {
		try {
			const response = await fetch(
				`https://hp-api.greatidea.dev/api/questions/origin?question_origin=${quizName}`,
				{
					method: 'GET'
				}
			);
			if (response.ok) {
				const data = await response.json();
				$questions = data.data;
				goto('/trivia-layout');
			} else {
				alert(response.status + ': Error retrieving questions.');
			}
		} catch (error) {
			console.error(error);
		}
	}

	async function handleMostDifficult() {
		try {
			const response = await fetch(`https://hp-api.greatidea.dev/api/questions/difficulty`, {
				method: 'GET'
			});
			if (response.ok) {
				const data = await response.json();
				$questions = data.data;
				goto('/trivia-layout');
			} else {
				alert(response.status + ': Error retrieving questions.');
			}
		} catch (error) {
			console.error(error);
		}
	}

	async function handleMostPopular() {
		try {
			const response = await fetch(`https://hp-api.greatidea.dev/api/questions/popular`, {
				method: 'GET'
			});
			if (response.ok) {
				const data = await response.json();
				$questions = data.data;
				goto('/trivia-layout');
			} else {
				alert(response.status + ': Error retrieving questions.');
			}
		} catch (error) {
			console.error(error);
		}
	}

	async function handleMostLiked() {
		try {
			const response = await fetch(`https://hp-api.greatidea.dev/api/questions/most-liked`, {
				method: 'GET'
			});
			if (response.ok) {
				const data = await response.json();
				$questions = data.data;
				goto('/trivia-layout');
			} else {
				alert(response.status + ': Error retrieving questions.');
			}
		} catch (error) {
			console.error(error);
		}
	}

	async function handleLeastAnswered() {
		try {
			const response = await fetch(`https://hp-api.greatidea.dev/api/questions/least-answered`, {
				method: 'GET'
			});
			if (response.ok) {
				const data = await response.json();
				$questions = data.data;
				goto('/trivia-layout');
			} else {
				alert(response.status + ': Error retrieving questions.');
			}
		} catch (error) {
			console.error(error);
		}
	}

	async function handleRandomQuestions() {
		try {
			const response = await fetch(`https://hp-api.greatidea.dev/api/questions/random`, {
				method: 'GET'
			});
			if (response.ok) {
				const data = await response.json();
				$questions = data.data;
				goto('/trivia-layout');
			} else {
				alert(response.status + ': Error retrieving questions.');
			}
		} catch (error) {
			console.error(error);
		}
	}
</script>

<div class="flex items-center justify-center px-8 font-medium text-secondary">
	<div class="flex flex-col items-center justify-center flex-1 max-w-4xl gap-6">
		<h2 class="w-full text-2xl font-bold text-center text-primary">Available Quizzes</h2>
		<p class="mb-4 text-left text-secondary">
			Select a quiz to test your knowledge! You can choose to select from some randomized quizzes
			which include 25 questions that are calculated to be either Most Popular, Most Difficult, Most
			Liked, or Least Answered. You can also choose to take a quiz with 25 completely random
			questions. Additionally, you can choose from any of the topics at the bottom for a more
			directed quiz!
		</p>
		<div class="flex flex-row flex-wrap items-center justify-center gap-4">
			<button on:click={() => handleMostDifficult()} class="btn btn-primary text-base-100 btn-wide"
				>Most Difficult</button
			>
			<button on:click={() => handleMostPopular()} class="btn btn-primary text-base-100 btn-wide"
				>Most Popular</button
			>
			<button on:click={() => handleMostLiked()} class="btn btn-primary text-base-100 btn-wide"
				>Most Liked</button
			>
			<button on:click={() => handleLeastAnswered()} class="btn btn-primary text-base-100 btn-wide"
				>Least Answered</button
			>
			<button
				on:click={() => handleRandomQuestions()}
				class="btn btn-primary text-base-100 btn-wide">Random Questions</button
			>
		</div>
		{#if $sources.length > 0 || availableTags.length > 0}
			<h2 class="w-full mt-10 text-2xl font-bold text-center text-primary">Quizzes by Topic</h2>
			<div class="flex flex-row flex-wrap items-center justify-center w-full gap-4">
				{#each availableTags as tag}
						<button
							on:click={() => getQuestionsByTag(tag)}
							class="text-xl font-medium text-center capitalize text-primary hover:underline">{tag}</button
						>
				{/each}
			</div>
			<h2 class="w-full mt-10 text-2xl font-bold text-center text-primary">Quizzes by Source</h2>
			<div class="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-3">
				{#each $sources as source}
					<div
						class="flex flex-row items-start justify-between gap-3 p-4 border rounded-lg border-primary"
					>
						<button
							on:click={() => handleQuizClick(source.source)}
							class="text-xl font-medium text-left text-primary">{source.source}</button
						>
						<a href={source.citation} target="_blank" class="link link-info link-hover">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								class="w-6 h-6 stroke-secondary shrink-0"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
								></path>
							</svg>
						</a>
					</div>
				{/each}
			</div>
		{:else}
			<p>No quizzes available</p>
		{/if}
	</div>
</div>
