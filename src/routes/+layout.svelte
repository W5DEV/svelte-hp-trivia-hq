<script>
    import Footer from "$lib/Footer.svelte";
    import Header from "$lib/Header.svelte";
    import "../app.css";
</script>

<section class="min-h-screen w-screen flex flex-col justify-between overflow-x-hidden">
    <Header />
    <slot />
    <Footer />
</section>
