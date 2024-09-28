<script>
	import logoLight from '../lib/images/hp-trivia-logo-red.png';
	import logoDark from '../lib/images/hp-trivia-logo-gold.png';
</script>

<label class="swap swap-rotate">
	<!-- this hidden checkbox controls the state -->
	<input type="checkbox" class="theme-controller" value="defaultDark" />

	<!-- Light Mode Logo -->
	<img src={logoLight} class="w-56 h-56 swap-off" alt="Light Mode" />

	<!-- Dark Mode Logo -->
	<img src={logoDark} class="w-56 h-56 swap-on" alt="Dark Mode" />
</label>
