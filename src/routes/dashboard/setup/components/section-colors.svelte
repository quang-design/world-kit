<script lang="ts">
	import Section from './_section.svelte';
	import { Input } from '$lib/components/ui/input';
	import { Plus } from '@lucide/svelte';

	let { colors = $bindable() } = $props();
	let showColorPicker = $state<number | null>(null);

	function addColor() {
		const newIndex = colors.length;
		colors = [...colors, { name: 'New Color', hex: '#3B82F6' }];
		showColorPicker = newIndex;
	}

	function handleColorChange(index: number, newColor: string) {
		const newColors = [...colors];
		newColors[index].hex = newColor;
		colors = newColors;
	}
</script>

<Section
	title="Add colors"
	description="Add your brand colors. These can automatically populate sections of your outline. You can replace or add more later."
>
	{#snippet content()}
		<div class="mt-4 space-y-4">
			<div class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
				{#each colors as color, i}
					<div class="flex flex-col items-center">
						<div
							class="relative h-24 w-24 items-center justify-center overflow-hidden rounded-full border-1 border-gray-200"
						>
							<input
								type="color"
								bind:value={color.hex}
								class="absolute inset-0 h-full w-full scale-125 cursor-pointer"
								onchange={(e) => handleColorChange(i, (e.target as HTMLInputElement).value)}
								role="button"
								tabindex="0"
							/>
						</div>
						<Input
							type="text"
							value={color.name}
							class="mt-2 w-full text-center"
							oninput={(e) => {
								const newColors = [...colors];
								newColors[i].name = (e.target as HTMLInputElement).value;
								colors = newColors;
							}}
						/>
					</div>
				{/each}

				<div class="flex flex-col items-center justify-center">
					<div class="relative">
						<button
							class="absolute inset-0 h-24 w-24 cursor-pointer opacity-0"
							onclick={addColor}
							onkeydown={(e) => e.key === 'Enter' && addColor()}
							aria-label="Add new color"
						></button>
						<div
							class="pointer-events-none flex h-24 w-24 items-center justify-center rounded-full border-2 border-dashed border-gray-300 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800"
						>
							<Plus class="h-8 w-8 text-gray-400" />
						</div>
					</div>
					<p class="mt-2 text-sm text-gray-500">Add Color</p>
				</div>
			</div>
		</div>
	{/snippet}
</Section>
