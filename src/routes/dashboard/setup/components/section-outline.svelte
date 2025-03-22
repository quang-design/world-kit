<script lang="ts">
	import Section from './_section.svelte';

	import { Card, CardContent } from '$lib/components/ui/card';
	import { Check } from '@lucide/svelte';

	type OutlineType = 'blank' | 'essential' | 'expanded';

	type OutlineOption = {
		type: OutlineType;
		title: string;
		description: string;
	};

	const outlineOptions: OutlineOption[] = [
		{
			type: 'blank',
			title: 'Blank',
			description: 'A blank slate to fully customize your project. Best for experts.'
		},
		{
			type: 'essential',
			title: 'Essential',
			description: 'A single-page guideline with common sections. Ideal for smaller brands.'
		},
		{
			type: 'expanded',
			title: 'Expanded',
			description: 'A multi-page guideline with comprehensive sections. Perfect for larger brands.'
		}
	];

	let { selectedOutline = $bindable() } = $props();
</script>

<Section
	title="Select outline"
	description="Choose your starting point. Design from scratch, or pick from a set of best-in-class sections to generate a working draft."
>
	{#snippet content()}
		<div class="mt-4 grid grid-cols-1 gap-6 md:grid-cols-3">
			{#each outlineOptions as option}
				<Card
					class={`${selectedOutline === option.type ? 'ring-2 ring-black dark:ring-white' : ''} cursor-pointer`}
					onclick={() => (selectedOutline = option.type)}
				>
					<CardContent class="p-6">
						<div class="space-y-4">
							<h3 class="text-xl font-bold">{option.title}</h3>
							<p class="text-sm text-gray-500 dark:text-gray-400">
								{option.description}
							</p>
							<div class="flex items-center justify-between">
								<span class="text-sm font-medium">Select</span>
								<input
									type="radio"
									id={option.type}
									bind:group={selectedOutline}
									value={option.type}
									class="sr-only"
								/>
								{#if selectedOutline === option.type}
									<div
										class="flex h-5 w-5 items-center justify-center rounded-full bg-black text-white dark:bg-white dark:text-black"
									>
										<Check size={14} />
									</div>
								{:else}
									<div
										class="h-5 w-5 rounded-full border border-gray-300 dark:border-gray-600"
									></div>
								{/if}
							</div>
						</div>
					</CardContent>
				</Card>
			{/each}
		</div>
	{/snippet}
</Section>
