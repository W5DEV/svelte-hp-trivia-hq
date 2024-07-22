<script lang="ts">
	import { onMount } from 'svelte';
	import { token } from '../../store';
	import { goto } from '$app/navigation';
	import { required, useForm } from 'svelte-use-form';

	onMount(() => {
		getUser();
	});

	const newToken = $token;

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
		answer_one: { validators: [required] },
		answer_two: { validators: [required] },
		answer_three: { validators: [required] },
		answer_four: { validators: [required] },
		source: { validators: [required] },
		tags: { validators: [required] },
		difficulty: { validators: [required] },
		correct_answer: { validators: [required] },
        completed: { validators: [] }, 
        question_origin: { validators: [required] }
	});

	let showSubmit = false;

	function onSubmit() {
		showSubmit = true;
		submitForm();
	}

	async function submitForm() {
		const questionValues = {
			question: $form.question.value,
			answers: [
				$form.answer_one.value,
				$form.answer_two.value,
				$form.answer_three.value,
				$form.answer_four.value
			],
			source: $form.source.value,
			tags: $form.tags.value.split(',').map((tag) => tag.trim()),
			type: 'multi-choice',
			difficulty: $form.difficulty.value,
			correct_answer: $form.correct_answer.value,
            completed: $form.completed.value ? 'true' : 'false',
            question_origin: $form.question_origin.value
		};
		try {
			const response = await fetch('https://hp-api.greatidea.dev/api/questions/', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + newToken
				},
				body: JSON.stringify(questionValues)
			});

			if (response.ok) {
				const data = await response.json();
				console.log(data);
				alert('Question added successfully!');
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
    <h1 class="text-2xl font-medium text-primary">Submit a new Multi Choice Question</h1>
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
                    />
                    <div class="w-full text-sm text-error" hidden={$form.question.valid}>
                        <p>Question is required.</p>
                    </div>
                </div>
				<div class="flex flex-col items-center justify-center w-full">
                    <input
                        type="text"
                        id="answer_one"
                        name="answer_one"
                        class="w-full input input-bordered"
                        placeholder="Answer 1"
                    />
                    <div class="w-full text-sm text-error" hidden={$form.answer_one.valid}>
                        <p>Answer is required.</p>
                    </div>
                </div>
				<div class="flex flex-col items-center justify-center w-full">
                    <input
                        type="text"
                        id="answer_two"
                        name="answer_two"
                        class="w-full input input-bordered"
                        placeholder="Answer 2"
                    />
                    <div class="w-full text-sm text-error" hidden={$form.answer_two.valid}>
                        <p>Answer is required.</p>
                    </div>
                </div>
				<div class="flex flex-col items-center justify-center w-full">
                    <input
                        type="text"
                        id="answer_three"
                        name="answer_three"
                        class="w-full input input-bordered"
                        placeholder="Answer 3"
                    />
                    <div class="w-full text-sm text-error" hidden={$form.answer_three.valid}>
                        <p>Answer is required.</p>
                    </div>
                </div>
				<div class="flex flex-col items-center justify-center w-full">
                    <input
                        type="text"
                        id="answer_four"
                        name="answer_four"
                        class="w-full input input-bordered"
                        placeholder="Answer 4"
                    />
                    <div class="w-full text-sm text-error" hidden={$form.answer_four.valid}>
                        <p>Answer is required.</p>
                    </div>
                </div>
				<div class="flex flex-col items-center justify-center w-full">
                    <select
                        id="source"
                        name="source"
                        class="w-full select select-bordered"
                        placeholder="Select a source"
                    >
                        <option selected disabled>Select a Source</option>
                        <option value="book">Book</option>
                        <option value="movie">Movie</option>
                        <option value="pottermore">Pottermore</option>
                        <option value="other">Other</option>
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
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                    </select>
                    <div class="w-full text-sm text-error" hidden={$form.difficulty.valid}>
                        <p>Difficulty is required.</p>
                    </div>
                </div>

				<div class="flex flex-col items-center justify-center w-full">
                    <input
                        type="text"
                        id="correct_answer"
                        name="correct_answer"
                        class="w-full input input-bordered"
                        placeholder="Correct Answer"
                    />
                    <div class="w-full text-sm text-error" hidden={$form.correct_answer.valid}>
                        <p>Correct answer is required.</p>
                    </div>
                </div>

                <div class="flex flex-col items-center justify-center w-full">
                    <input
                        type="text"
                        id="question_origin"
                        name="question_origin"
                        class="w-full input input-bordered"
                        placeholder="Question Origin (Where did this question originate?)"
                    />
                    <div class="w-full text-sm text-error" hidden={$form.question_origin.valid}>
                        <p>Question origin is required.</p>
                    </div>
                </div>

                <div class="flex flex-col items-center justify-center w-full">
                    <div class="flex flex-row items-center justify-center w-full gap-4">
                        <label for="completed">Completed?</label>
                        <input type="checkbox" class="toggle toggle-success" checked={false}
                            id="completed"
                            name="completed"
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
			<h1 class="text-xl">Question submitted successfully!</h1>
		</div>
	{/if}
</section>
