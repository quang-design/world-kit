<script lang="ts">
	import Section from './_section.svelte';

	// Define exposed props with bindable
	let { typographyStyles = $bindable() } = $props();
</script>

<Section
	title="Define type styles"
	description="Customize the typography for your project by defining styles that will be used throughout the document."
>
	{#snippet content()}
		<div class="mt-4 space-y-8">
			{#each typographyStyles as style, i}
				<div class="border-b border-gray-200 pb-6 dark:border-gray-700">
					<div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
						<div class="md:w-1/4">
							<h4 class="text-sm font-medium">{style.name}</h4>
							<div class="mt-2 flex flex-wrap gap-2">
								<div class="rounded bg-gray-100 px-2 py-1 text-xs dark:bg-gray-800">
									{style.size}
								</div>
								<div class="rounded bg-gray-100 px-2 py-1 text-xs dark:bg-gray-800">
									{style.weight === 700 ? 'Bold' : 'Regular'}
								</div>
								<div class="rounded bg-gray-100 px-2 py-1 text-xs dark:bg-gray-800">
									Line height: {style.lineHeight}
								</div>
							</div>
						</div>
						<div class="md:w-3/4">
							<p
								class="break-words"
								style="font-size: {style.size}; font-weight: {style.weight}; line-height: {style.lineHeight};"
							>
								{style.sample}
							</p>
						</div>
					</div>
				</div>
			{/each}
		</div>
	{/snippet}
</Section>
