<script lang="ts">
	import { writable } from 'svelte/store';
	import QuestionCanvas from '../../lib/QuestionCanvas.svelte';
	import { questions } from '../../store';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	const currentQuestions = $questions;

	type QuestionRecap = {
		questionNumber: number;
		question: string;
		correct_answer: string;
		your_answer: string;
		correct: boolean;
		isLiked: boolean;
		isReported: boolean;
	};

	let currentQuestionIndex = 0;
	let numCorrect = 0;
	let numQuestions = currentQuestions.length;
	let questionArray = writable<QuestionRecap[]>([]);

	async function handleAnswer(answer: string) {
		const sortedCorrectAnswers = currentQuestions[currentQuestionIndex].correct_answer
			.split(',')
			.sort()
			.join(', ');
		const sortedAnswer = answer.split(',').sort().join(', ');
		if (sortedCorrectAnswers === sortedAnswer) {
			numCorrect++;
			await fetch(
				`https://hp-api.greatidea.dev/api/questions/answer?questionsId=${currentQuestions[currentQuestionIndex].id}&is_correct=true`,
				{
					method: 'PUT'
				}
			);
		} else {
			await fetch(
				`https://hp-api.greatidea.dev/api/questions/answer?questionsId=${currentQuestions[currentQuestionIndex].id}&is_correct=false`,
				{
					method: 'PUT'
				}
			);
		}

		questionArray.update((questionArray) => [
			...questionArray,
			{
				questionNumber: currentQuestionIndex + 1,
				question: currentQuestions[currentQuestionIndex].question,
				correct_answer: sortedCorrectAnswers,
				your_answer: sortedAnswer,
				correct: sortedCorrectAnswers === sortedAnswer,
				isLiked: false,
				isReported: false
			}
		]);

		currentQuestionIndex++;
	}

	async function handleLike(question: QuestionRecap) {
		if (question.isLiked) {
			return;
		} else {
			const updatedQuestion = { ...question, isLiked: true };

			questionArray.update((questions) => {
				return questions.map((q) =>
					q.questionNumber === question.questionNumber ? updatedQuestion : q
				);
			});

			await fetch(
				`https://hp-api.greatidea.dev/api/questions/like?questionsId=${currentQuestions[question.questionNumber - 1].id}`,
				{
					method: 'PUT'
				}
			);
		}
	}

	async function handleReport(question: QuestionRecap) {
		if (question.isReported) {
			return;
		}
		const reportedQuestion = {
			access_key: '158aa036-6978-45e0-b4e2-780bd06ee898',
			question: question.question,
			answer_list: currentQuestions[question.questionNumber - 1].answers,
			correct_answer: question.correct_answer,
			provided_answer: question.your_answer,
			correct: question.correct
		};
		const json = JSON.stringify(reportedQuestion);

		const response = await fetch('https://api.web3forms.com/submit', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json'
			},
			body: json
		});
		const result = await response.json();
		if (result.success) {
			console.log(result);
			const updatedQuestion = { ...question, isReported: true };

			questionArray.update((questions) => {
				return questions.map((q) =>
					q.questionNumber === question.questionNumber ? updatedQuestion : q
				);
			});
		}
	}

	onMount(async () => {
		if (currentQuestions.length === 0) {
			goto('/quiz-selection');
		}
	});
</script>

{#if currentQuestionIndex < currentQuestions.length}
	<QuestionCanvas
		question={currentQuestions[currentQuestionIndex]}
		onAnswer={handleAnswer}
		questionNumber={currentQuestionIndex + 1}
		totalQuestions={numQuestions}
	/>
{:else}
	<div class="flex flex-col items-center justify-start gap-6">
		<h2 class="text-2xl font-semibold text-primary">Quiz Complete</h2>
		<p class="text-lg font-medium text-info">
			You answered {numCorrect} out of {numQuestions} questions correctly.
		</p>
		<a href="/quiz-selection" class="btn btn-primary btn-wide">Back to Quiz Selection</a>
		<div class="flex flex-col items-center justify-start w-full gap-3">
			<h2 class="text-xl font-semibold text-primary">Your Answers</h2>
			<hr class="w-full my-8 border border-secondary" />
			{#each $questionArray as question}
				<div class="flex flex-col items-start justify-start w-full gap-4 px-8">
					<p class="text-2xl font-medium text-primary front-semibold">
						{question.questionNumber}. {question.question}
					</p>
					<p class="text-lg font-medium text-primary">Correct Answer: {question.correct_answer}</p>
					<p
						class={question.correct
							? `text-lg font-medium text-success`
							: `text-lg font-medium text-error italic line-through`}
					>
						Your Answer: {question.your_answer}
					</p>
					<div class="flex flex-row items-center justify-end w-full gap-6">
						<button
							on:click={() => handleLike(question)}
							class={question.isLiked ? 'text-success' : 'text-slytherin-silver hover:text-success'}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="w-6 h-6"
								fill={question.isLiked ? 'currentColor' : 'none'}
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
								/>
							</svg>
						</button>
						<button
							on:click={() => handleReport(question)}
							class={question.isReported ? 'text-error' : 'text-slytherin-silver hover:text-error'}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill={question.isReported ? 'currentColor' : 'none'}
								viewBox="0 0 24 24"
								stroke-width={1.5}
								stroke="currentColor"
								class="size-6"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M3 3v1.5M3 21v-6m0 0 2.77-.693a9 9 0 0 1 6.208.682l.108.054a9 9 0 0 0 6.086.71l3.114-.732a48.524 48.524 0 0 1-.005-10.499l-3.11.732a9 9 0 0 1-6.085-.711l-.108-.054a9 9 0 0 0-6.208-.682L3 4.5M3 15V4.5"
								/>
							</svg>
						</button>
					</div>
				</div>
				<hr class="w-full my-8 border border-secondary" />
			{/each}
		</div>
		<a href="/quiz-selection" class="btn btn-primary btn-wide">Back to Quiz Selection</a>
	</div>
{/if}
