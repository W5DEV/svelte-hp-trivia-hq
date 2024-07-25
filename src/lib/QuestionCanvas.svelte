<script lang="ts">
	import { onMount } from "svelte";
	import type { Question } from "../store";

    export let question: Question;
    export let onAnswer: (answer: string) => void;
    export let totalQuestions: number;
    export let questionNumber: number;

    type Answer = {
        answer: string;
        selected: boolean;
        sort: number;
    };

    let displayedAnswers: Answer[] = [];
    let selectedAnswer: string[] = [];


    $ : displayedAnswers = question.answers.map((answer) => ({ answer, selected: false, sort: Math.random() })).sort((a, b) => a.sort - b.sort);

    function handleMultiSelection(selectedOption: typeof displayedAnswers[0], i: number) {
        displayedAnswers[i].selected = !displayedAnswers[i].selected;
        if (selectedOption.selected) {
            selectedAnswer.push(selectedOption.answer);
        } else {
            selectedAnswer = selectedAnswer.filter((answer) => answer !== selectedOption.answer);
        }
    }

    function handleSelection(selectedOption: typeof displayedAnswers[0], i: number) {
        console.log(selectedAnswer)
        displayedAnswers.forEach((option) => {
            option.selected = false;
            });
        displayedAnswers[i].selected = true;
        selectedAnswer = [selectedOption.answer];
    }

    function handleAnswer() {
        const finalAnswer: string = selectedAnswer.join(',');
        selectedAnswer = [];
        onAnswer(finalAnswer);
    }
</script>

<div class="flex flex-col items-center justify-center w-full gap-4 px-8">
    <h2 class="text-2xl font-semibold text-primary">Question {questionNumber} of {totalQuestions}:</h2>
    <h2 class="text-2xl font-semibold text-primary">{question.question}</h2>
    {#if question.type === 'multi-select'}
        <div class="grid w-full grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-3">
            {#each displayedAnswers as option, i}
                <button on:click={() => handleMultiSelection(option, i)} class={displayedAnswers[i].selected ? `btn btn-success` : `btn btn-info`}>
                    <p>{option.answer}</p>
                </button>
            {/each}
        </div>
        <div class="flex flex-row items-center justify-center w-full">
            <button on:click={() => handleAnswer()} class="btn btn-primary btn-wide">Next</button>
        </div>
    {:else}
        <div class="grid w-full grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-3">
            {#each displayedAnswers as option, i}
                <button on:click={() => handleSelection(option, i)} class={displayedAnswers[i].selected ? `btn btn-success` : `btn btn-info`}>
                    <p>{option.answer}</p>
                </button>
            {/each}
        </div>
        <div class="flex flex-row items-center justify-center w-full">
            <button on:click={() => handleAnswer()} class="btn btn-primary btn-wide">Next</button>
        </div>
    {/if}
</div>