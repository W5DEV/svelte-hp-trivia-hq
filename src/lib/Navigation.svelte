<script lang='ts'>
	import gryffindorLogo from "../lib/images/hp-trivia-logo-gryffindor-red.svg";
    import hufflepuffLogo from "../lib/images/hp-trivia-logo-hufflepuff-yellow.svg";
    import ravenclawLogo from "../lib/images/hp-trivia-logo-ravenclaw-blue.svg";
    import slytherinLogo from "../lib/images/hp-trivia-logo-slytherin-green.svg";
    import defaultLogo from "../lib/images/hp-trivia-logo.svg";
    import { theme } from "../store";
    import { onMount } from "svelte";

    // OnMount, get the theme as a reactive store and set the logo based on what is stored, reactive so when the theme updates the logo updates too
    onMount(() => {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme) {
            theme.set(savedTheme);
        }
    });

    // Set the logo based on the theme
    let logo = defaultLogo;
    $: if ($theme === "gryffindor") {
        logo = gryffindorLogo;
    } else if ($theme === "hufflepuff") {
        logo = hufflepuffLogo;
    } else if ($theme === "ravenclaw") {
        logo = ravenclawLogo;
    } else if ($theme === "slytherin") {
        logo = slytherinLogo;
    } else {
        logo = defaultLogo;
    }



</script>
<nav class="flex flex-row items-center justify-center text-primary">
    <img src={logo} class="w-56 h-56 swap-on fill-primary stroke-primary" alt="Dark Mode"/>
</nav>