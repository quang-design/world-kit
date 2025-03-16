<script lang="ts">
	import '../app.css';
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import { injectAnalytics } from '@vercel/analytics/sveltekit';

	let { data, children } = $props();
	let { session, supabase } = $derived(data);

	onMount(() => {
		const { data } = supabase.auth.onAuthStateChange((_, newSession) => {
			if (newSession?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => data.subscription.unsubscribe();
	});
	injectAnalytics();
</script>

<main class="min-h-dvh overflow-hidden">
	<div class=" grid min-h-dvh grid-cols-[1rem_1fr_1rem] grid-rows-[1rem_1fr_1rem]">
		<!-- Top row -->
		<div class="border-r border-b border-gray-100"></div>
		<div class="border-b border-gray-100"></div>
		<div class="border-b border-l border-gray-100"></div>

		<!-- Middle row -->
		<div class="border-r border-gray-100"></div>
		<div class="p-4">
			{@render children()}
		</div>
		<div class="border-l border-gray-100"></div>

		<!-- Bottom row -->
		<div class="border-t border-r border-gray-100"></div>
		<div class="border-t border-gray-100"></div>
		<div class="border-t border-l border-gray-100"></div>
	</div>
</main>
