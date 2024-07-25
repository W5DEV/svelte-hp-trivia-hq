<script lang="ts">
	import type { Question } from "../store";
    import parchment from "../lib/images/parchment-bg.svg";

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

    const alphabetArray = 'abcdefghijklmnopqrstuvwxyz';


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

<div class="flex items-center justify-center w-screen">
    <div class="flex flex-col items-center justify-between w-screen max-w-4xl gap-4 px-10 md:px-28 py-24 min-h-[600px] h-content" style="background-image: url({parchment}); background-size: cover; background-position: center; background-repeat: no-repeat;">
        <div class="flex flex-col items-center justify-center gap-4 text-left">
            <h2 class="text-2xl font-semibold text-neutral">Question {questionNumber} of {totalQuestions}:</h2>
            <h2 class="text-2xl font-semibold text-neutral">{question.question}</h2>
        </div>
        {#if question.type === 'multi-select'}
            <div class="flex flex-col items-start justify-center w-full gap-4 text-left">
                {#each displayedAnswers as option, i}
                    <button on:click={() => handleMultiSelection(option, i)} class={displayedAnswers[i].selected ? `text-left text-secondary font-semibold text-xl bg-secondary bg-opacity-10 hover:bg-secondary hover:bg-opacity-10 hover:italic` : `text-left text-neutral font-semibold text-xl hover:bg-transparent hover:italic`}>
                        <p>{alphabetArray[i].toUpperCase()}. {option.answer}</p>
                    </button>
                {/each}
            </div>
            <div class="flex flex-row items-center justify-center w-full">
                <button on:click={() => handleAnswer()} class="text-2xl btn btn-ghost btn-wide text-neutral hover:text-secondary hover:bg-transparent">Next</button>
            </div>
        {:else}
            <div class="flex flex-col items-start justify-center w-full gap-4 text-left">
                {#each displayedAnswers as option, i}
                    <button on:click={() => handleSelection(option, i)} class={displayedAnswers[i].selected ? `text-left text-secondary font-semibold text-xl bg-secondary bg-opacity-10 hover:bg-secondary hover:bg-opacity-10 hover:italic` : `text-left text-neutral font-semibold text-xl hover:bg-transparent hover:italic`}>
                        <p>{alphabetArray[i].toUpperCase()}. {option.answer}</p>
                    </button>
                {/each}
            </div>
            <div class="flex flex-row items-center justify-center w-full">
                <button on:click={() => handleAnswer()} class="text-2xl btn btn-ghost btn-wide text-neutral hover:text-secondary hover:bg-transparent">Next</button>
            </div>
        {/if}
    </div>
</div>