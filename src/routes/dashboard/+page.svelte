<script lang="ts">
	import { invalidate } from '$app/navigation';
	import type { EventHandler } from 'svelte/elements';

	import type { PageData } from './$types';
	import Button from '$lib/components/ui/button/button.svelte';
	import Globe from './globe.svg.svelte';

	let { data } = $props();
	let { notes, supabase, user } = $derived(data);
</script>

<svelte:head>
	<title>Dashboard - World Kit</title>
</svelte:head>

<section class="my-4 w-full">
	<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
		<div
			class="relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-full border border-gray-100 bg-white"
		>
			<div class="h-full w-full">
				<Globe />
			</div>
			<Button variant="outline" size="sm" class="absolute z-10">World_001</Button>
		</div>
		<div
			class="relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-full border border-gray-100 bg-white"
		>
			<div class="h-full w-full">
				<Globe />
			</div>
			<Button variant="outline" size="sm" class="absolute z-10">World_002</Button>
		</div>
	</div>
</section>
