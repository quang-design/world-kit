<script>
	import NavBar from './_assets/nav-bar.svelte';

	let { data, children } = $props();
	let { supabase } = $derived(data);
</script>

<NavBar {supabase} />

<main>
	{@render children()}
</main>
