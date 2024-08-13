<script lang="ts">
	import { question_origins } from "../../sources";
	import { token } from '../../store';

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

    const questionOrigins = question_origins;

    const newToken = $token;

    let sources: Source[] = [];

     async function getSources() {
        try {
            const response = await fetch('https://hp-api.greatidea.dev/api/sources/topic?topic=Harry Potter', {
                method: 'GET' 
            });
            if (response.ok) {
                const data = await response.json();
                // set sources = data.data and sort by data.order
                sources = data.data.sort((a: Source, b: Source) => a.order - b.order);
            } else {
                alert(response.status + ': Error retrieving questions.');
            }
        } catch (error) {
            console.error(error);
        }
    }

    async function handleMarkActive(source: Source) {
        try {
            const response = await fetch(`http://hp-api.greatidea.dev/api/sources/toggle-active/${source.id}`, {
                method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + newToken
				}
            });
            if (response.ok) {
                getSources();
            } else {
                alert(response.status + ': Error marking source active.');
            }
        } catch (error) {
            console.error(error);
        }
    }

    async function handleMarkCompleted(source: Source) {
        try {
            const response = await fetch(`https://hp-api.greatidea.dev/api/sources/toggle-completed/${source.id}`, {
                method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + newToken
				}
            });
            if (response.ok) {
                getSources();
            } else {
                alert(response.status + ': Error marking source completed.');
            }
        } catch (error) {
            console.error(error);
        }
    }

    getSources();

    $: sources
</script>
<section class="flex items-center justify-center px-8 font-medium text-secondary">
    <div class="flex flex-col items-center justify-center flex-1 max-w-4xl gap-6">
        <h1 class="text-3xl font-bold text-center text-primary">Harry Potter Trivia Quiz Sources</h1>
        <p class="font-semibold text-center text-info">The sources in green are currently active inside the quiz.</p>
        <a class="text-base-100 btn btn-primary btn-wide" href="/dashboard">Dashboard</a>
        <div class="grid grid-cols-1 gap-4 p-4 md:grid-cols-2">
            {#each sources as source}
                    <div class="flex flex-col items-start justify-between gap-3 p-4 border rounded-lg border-base-300">
                        <div class="flex flex-row items-center justify-between w-full gap-3">
                            <h2 class={source.active === "true" ? `text-xl font-medium text-success` : `text-xl font-light italic text-error`}>{source.source}</h2>
                            <a href={source.citation} target="_blank" class="link link-info link-hover">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    class="w-6 h-6 stroke-secondary shrink-0">
                                    <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                            </a>
                        </div>
                        <div class="flex flex-row items-center justify-between w-full">
                            <button on:click={() => handleMarkActive(source)} class={source.active === "true" ? 'text-success' : 'text-error'}>{source.active === "true" ? "Active" : "Inactive"}</button>
                            <button on:click={() => handleMarkCompleted(source)} class={source.completed === "true" ? 'text-success' : 'text-error'}>{source.completed === "true" ? "Completed" : "Not Completed"}</button>
                        </div>
                    </div>
            {/each}
        </div>
    </div>
</section>