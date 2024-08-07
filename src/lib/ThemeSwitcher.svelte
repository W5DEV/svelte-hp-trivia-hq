<script lang="ts">
    import { theme } from "../store";
    import { onMount } from "svelte";

    onMount(() => {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme) {
            theme.set(savedTheme);
        }

        const themeButtons = document.querySelectorAll('.theme-controller');
        themeButtons.forEach((button: Element) => {
            const inputButton = button as HTMLInputElement;
            inputButton.addEventListener('click', () => {
                theme.set(inputButton.value);
                localStorage.setItem('theme', inputButton.value);
            });
        });
    });
</script>

<div class="flex items-center justify-center w-screen px-0 m-0 rounded-none join join-horizontal text-caveat">
    <input
    type="radio"
    name="theme-buttons"
    class="w-1/4 rounded-none checked:border-none new-btn theme-controller bg-gryffindor-red text-gryffindor-gold"
    aria-label="Gryffindor"
    checked={$theme === "gryffindorLight"}
    value="gryffindorLight" />
    <input
    type="radio"
    name="theme-buttons"
    class="w-1/4 rounded-none checked:border-none new-btn theme-controller bg-hufflepuff-yellow text-hufflepuff-brown"
    aria-label="Hufflepuff"
    checked={$theme === "hufflepuffLight"}
    value="hufflepuffLight" />
    <input
    type="radio"
    name="theme-buttons"
    class="w-1/4 rounded-none checked:border-none new-btn theme-controller bg-ravenclaw-blue text-ravenclaw-silver"
    aria-label="Ravenclaw"
    checked={$theme === "ravenclawLight"}
    value="ravenclawLight" />
    <input
    type="radio"
    name="theme-buttons"
    class="w-1/4 rounded-none checked:border-none new-btn theme-controller bg-slytherin-green text-slytherin-silver"
    aria-label="Slytherin"
    checked={$theme === "slytherinLight"}
    value="slytherinLight" />
</div>

<style>
    .new-btn {
    display: flex;
    margin: 0 !important;
    height: 3rem;
    min-height: 3rem;
    flex-shrink: 0;
    cursor: pointer;
    -webkit-user-select: none;
            user-select: none;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    border-radius: 0;
    width: 25%;
    text-align: center;
    font-size: 0.875rem;
    line-height: 1em;
    font-weight: 800;
    text-decoration-line: none;
    transition-duration: 200ms;
    transition-timing-function: cubic-bezier(0, 0, 0.2, 1);
    transition-property: color, background-color, border-color, opacity, box-shadow, transform;
    --tw-text-opacity: 1;
    --tw-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
    --tw-shadow-colored: 0 1px 2px 0 var(--tw-shadow-color);
    box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
    --tw-bg-opacity: 1;
    --tw-border-opacity: 1
    }
    :where(.new-btn:is(input[type="checkbox"])),
    :where(.new-btn:is(input[type="radio"])) {
        width: auto;
        appearance: none}
    .new-btn:is(input[type="checkbox"]):after,
    .new-btn:is(input[type="radio"]):after {
        --tw-content: attr(aria-label);
        content: var(--tw-content)}
</style>