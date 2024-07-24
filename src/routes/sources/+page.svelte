<script lang="ts">
	import { question_origins } from "../../sources";

    const questionOrigins = question_origins;
</script>

<div class="flex flex-col items-center justify-center gap-4">
    <h1 class="text-3xl font-bold text-center">Harry Potter Trivia Quiz Sources</h1>
    <p class="text-center text-primary">The sources in green are currently active inside the quiz.</p>
    <p class="text-center text-primary">To activate additional sources, ping John.</p>
    <a class="btn btn-primary btn-xs sm:btn-sm md:btn-md lg:btn-lg" href="/dashboard">Dashboard</a>
    <div class="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-3">
        {#each questionOrigins as origin}
                <div class="flex flex-row items-start justify-between gap-3 p-4 border rounded-lg border-base-300">
                    <h2 class={origin.active ? `text-xl font-medium text-success` : `text-xl font-light italic text-error`}>{origin.name}</h2>
                    <a href={origin.link} target="_blank" class="link link-info link-hover">
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
</div>