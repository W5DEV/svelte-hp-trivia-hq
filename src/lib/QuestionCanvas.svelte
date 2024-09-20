<script lang="ts">
	import { sources, type Question, type Source } from "../store";
    import parchment from "../lib/images/parchment-bg.svg";
	import { onMount } from "svelte";
    export let question: Question;
    export let onAnswer: (answer: string) => void;
    export let totalQuestions: number;
    export let questionNumber: number;

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

    type Answer = {
        answer: string;
        selected: boolean;
        sort: number;
    };

    let displayedAnswers: Answer[] = [];
    let selectedAnswer: string[] = [];

    $: difficulty = question.difficulty ? 10 - Math.floor(question.difficulty/10) : 5;

    onMount(() => {
        difficulty = question.difficulty ? 10 - Math.floor(question.difficulty/10) : 5;
    });

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
        const finalAnswer: string = selectedAnswer.join('\n');
        selectedAnswer = [];
        onAnswer(finalAnswer);
    }

    function getOriginLink() {
        if ($sources.length === 0) {
            getQuestionOrigins();
        }
        const origin = $sources.find((origin) => origin.source === question.question_origin);
        return origin?.citation;
    }
</script>

<div class="flex items-center justify-center w-screen font-caveat">
    <div class="flex flex-col items-center justify-between w-screen max-w-4xl gap-6 px-10 md:px-28 py-16 min-h-[600px] h-content" style="background-image: url({parchment}); background-size: cover; background-position: center; background-repeat: no-repeat;">
        <div class="flex items-center flex-center">
            <div class="flex flex-row items-center justify-center gap-2">
                <p class="mr-1 text-2xl font-medium text-gryffindor-red">Difficulty: </p>
                <span class={'text-2xl font-extrabold ' + (difficulty < 4 ? 'text-green-600' : difficulty > 6 ? 'text-red-600' : 'text-yellow-400')}>
                    {difficulty}/10
                </span>
                <span class={(difficulty < 4 ? 'text-green-600' : difficulty > 6 ? 'text-red-600' : 'text-yellow-400')}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" stroke-width="1.5" stroke="none" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
                    </svg>
                </span>
            </div>
        </div>
        <div class="flex flex-col items-center justify-center w-full gap-4 text-left">
            <h2 class="text-3xl font-semibold text-gryffindor-red">Question {questionNumber} of {totalQuestions}:</h2>
            <h2 class="w-full text-4xl font-light text-left text-gryffindor-red"><strong class="font-extrabold underline">{question.type === "multi-select" ? "Select all that apply:" : question.type === "true-false" ? "True or False:"  : ""}</strong> {question.question}</h2>
        </div>
        {#if question.type === 'multi-select'}
            <div class="flex flex-col items-start justify-center w-full gap-4 font-light text-left">
                {#each displayedAnswers as option, i}
                    <button on:click={() => handleMultiSelection(option, i)} class={displayedAnswers[i].selected ? `text-left text-slytherin-green font-light text-3xl hover:italic px-4` : `text-left text-gryffindor-red font-light text-3xl hover:bg-transparent hover:italic px-4`}>
                        <p>{alphabetArray[i].toUpperCase()}. {option.answer}</p>
                    </button>
                {/each}
            </div>
            <div class="flex flex-row items-center justify-center w-full">
                <button on:click={() => handleAnswer()} class="text-4xl btn btn-ghost btn-wide text-gryffindor-red hover:text-slytherin-green hover:bg-transparent">Next</button>
            </div>
        {:else}
            <div class="flex flex-col items-start justify-center w-full gap-4 font-light text-left">
                {#each displayedAnswers as option, i}
                    <button on:click={() => handleSelection(option, i)} class={displayedAnswers[i].selected ? `text-left text-slytherin-green font-light text-3xl hover:italic px-4` : `text-left text-gryffindor-red font-light text-3xl hover:bg-transparent hover:italic px-4`}>
                        <p>{alphabetArray[i].toUpperCase()}. {option.answer}</p>
                    </button>
                {/each}
            </div>
            <div class="flex flex-row items-center justify-center w-full">
                <button on:click={() => handleAnswer()} class="text-4xl btn btn-ghost btn-wide text-gryffindor-red hover:text-slytherin-green hover:bg-transparent">Next</button>
            </div>
        {/if}
        <div class="flex flex-row items-end justify-end w-full top-10 right-10">
            <a href={getOriginLink()} target="_blank" class="text-sm font-medium tooltip tooltip-left text-gryffindor-red" data-tip={question.question_origin}>
                <svg xmlns="http://www.w3.org/2000/svg" target="_blank" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                </svg>
            </a>
        </div>
    </div>
</div>