<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { questions, sources } from '../store';
	import { GetSources } from '$lib/api/GetSources';
	import { GetTags } from '$lib/api/GetTags';
	import GetQuestionsByTag from '$lib/api/GetQuestionsByTag';
	import GetQuestionsBySource from '$lib/api/GetQuestionsBySource';
	import { GetMostDifficultQuestions } from '$lib/api/GetMostDifficultQuestions';
	import { GetMostPopularQuestions } from '$lib/api/GetMostPopularQuestions';
	import GetMostLikedQuestions from '$lib/api/GetMostLikedQuestions';
	import GetLeastAnsweredQuestions from '$lib/api/GetLeastAnsweredQuestions';
	import GetRandomQuestions from '$lib/api/GetRandomQuestions';

	onMount(() => {
		if ($sources.length === 0) {
			getQuestionOrigins();
		}
	});

	async function getQuestionOrigins() {
		await GetSources();
	}

	$questions = [];

	let availableTags: string[] = [];

	async function fetchAvailableTags() {
		availableTags = await GetTags();
	}

	fetchAvailableTags();

	async function getQuestionsByTag(tag: string) {
		$questions = await GetQuestionsByTag(tag);
		if ($questions.length > 0) {
			goto('/trivia-layout');
		}
	}

	async function handleQuizClick(quizName: string) {
		$questions = await GetQuestionsBySource(quizName);
		if ($questions.length > 0) {
			goto('/trivia-layout');
		}
	}

	async function handleMostDifficult() {
		$questions = await GetMostDifficultQuestions();
		if ($questions.length > 0) {
			goto('/trivia-layout');
		}
	}

	async function handleMostPopular() {
		$questions = await GetMostPopularQuestions();
		if ($questions.length > 0) {
			goto('/trivia-layout');
		}
	}

	async function handleMostLiked() {
		$questions = await GetMostLikedQuestions();
		if ($questions.length > 0) {
			goto('/trivia-layout');
		}
	}

	async function handleLeastAnswered() {
		$questions = await GetLeastAnsweredQuestions();
		if ($questions.length > 0) {
			goto('/trivia-layout');
		}
	}

	async function handleRandomQuestions() {
		$questions = await GetRandomQuestions();
		if ($questions.length > 0) {
			goto('/trivia-layout');
		}
	}
</script>

<svelte:head>
	<title>Harry Potter Trivia</title>
</svelte:head>

<div class="flex items-center justify-center px-8 font-medium text-secondary">
	<div class="flex flex-col items-center justify-center flex-1 max-w-4xl gap-6">
		<h1 class="text-2xl font-bold text-primary">
			World of Harry <a href="https://trivia-hq.com/login">Potter</a> Trivia
		</h1>
		<a href="/disclaimer" class="text-xs font-bold text-primary">Disclaimer</a>
		<p class="text-primary">
			Test your knowledge of the Harry Potter Universe with random multi-choice, true or false, or
			multi-select questions! Choose from a variety of randomized quizzes or select a focused topic
			to test your knowledge!
		</p>
		<p class="mb-4 text-left text-secondary">
			You can choose to select from our randomized quizzes which include 25 questions that are
			calculated to be either Most Popular, Most Difficult, Most Liked, or Least Answered. You can
			also choose to take a quiz with 25 completely random questions. Additionally, you can choose
			from any of the topics or sources below for a more directed quiz!
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
						class="text-xl font-medium text-center capitalize text-primary hover:underline"
						>{tag}</button
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
