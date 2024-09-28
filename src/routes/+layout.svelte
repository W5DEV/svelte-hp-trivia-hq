<script>
	import Footer from '$lib/Footer.svelte';
	import Header from '$lib/Header.svelte';
	import '../app.css';
</script>

<section class="flex flex-col justify-between w-screen min-h-screen overflow-x-hidden">
	<Header />
	<slot />
	<Footer />
</section>
