<script lang='ts'>
	import gryffindorLogoLight from "../lib/images/hp-trivia-logo-gryffindor-red.svg";
    import hufflepuffLogoLight from "../lib/images/hp-trivia-logo-hufflepuff-brown.svg";
    import ravenclawLogoLight from "../lib/images/hp-trivia-logo-ravenclaw-blue.svg";
    import slytherinLogoLight from "../lib/images/hp-trivia-logo-slytherin-green.svg";
    import defaultLogo from "../lib/images/hp-trivia-logo.svg";
    import gryffindorLogoDark from "../lib/images/hp-trivia-logo-gryffindor-gold.svg";
    import hufflepuffLogoDark from "../lib/images/hp-trivia-logo-hufflepuff-yellow.svg";
    import ravenclawLogoDark from "../lib/images/hp-trivia-logo-ravenclaw-bronze.svg";
    import slytherinLogoDark from "../lib/images/hp-trivia-logo-slytherin-silver.svg";
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
    $: if ($theme === "gryffindorLight") {
        logo = gryffindorLogoLight;
    } else if ($theme === "hufflepuffLight") {
        logo = hufflepuffLogoLight;
    } else if ($theme === "ravenclawLight") {
        logo = ravenclawLogoLight;
    } else if ($theme === "slytherinLight") {
        logo = slytherinLogoLight;
    } else if ($theme === "gryffindorDark") {
        logo = gryffindorLogoDark;
    } else if ($theme === "hufflepuffDark") {
        logo = hufflepuffLogoDark;
    } else if ($theme === "ravenclawDark") {
        logo = ravenclawLogoDark;
    } else if ($theme === "slytherinDark") {
        logo = slytherinLogoDark;
    } else {
        logo = defaultLogo;
    }



</script>
<nav class="flex flex-row items-center justify-center text-primary">
    <img src={logo} class="w-56 h-56 swap-on fill-primary stroke-primary" alt="Dark Mode"/>
</nav>