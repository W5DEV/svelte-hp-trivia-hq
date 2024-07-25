<script lang='ts'>
	import { goto } from "$app/navigation";
    import { question_origins } from "../../sources";
    import { questions } from "../../store";

    $questions = [];

    const availableQuizzes = question_origins.filter((origin) => origin.active === true);

    async function handleQuizClick(quizName: string) {
        try {
            const response = await fetch(`https://hp-api.greatidea.dev/api/questions/question_origin?question_origin=${quizName}`, {
                method: 'GET' 
            });
            if (response.ok) {
                const data = await response.json();
                console.log(data.data);
                $questions = data.data;
                console.log($questions);
                alert('Quiz prepared!');
                goto('/trivia-layout');
            } else {
                console.log(response);
                alert(response.status + ': Error retrieving questions.');
            }
        } catch (error) {
            console.error(error);
        }

    }

</script>

<div>
    <h2>Available Quizzes</h2>
    {#if availableQuizzes.length > 0}
        <div class="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-3">
            {#each availableQuizzes as quiz}
                <div class="flex flex-row items-start justify-between gap-3 p-4 border rounded-lg border-base-300">
                    <button on:click={() => handleQuizClick(quiz.name)} class='text-xl font-medium text-primary'>{quiz.name}</button>
                    <a href={quiz.link} target="_blank" class="link link-info link-hover">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            class="w-6 h-6 stroke-info shrink-0">
                            <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                    </a>
                </div>
            {/each}
        </div>
    {:else}
        <p>No quizzes available</p>
    {/if}
</div>