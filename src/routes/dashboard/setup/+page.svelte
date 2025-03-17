<script>
	import Section from './section.svelte';

	let worldName = $state('WorldKit');
</script>

<Section title="Your World's Name" description="Enter a name for your world.">
	{#snippet content()}
		<h2
			class=" w-full max-w-full border-transparent text-4xl font-bold break-all whitespace-normal sm:text-6xl md:text-8xl
     {worldName === 'WorldKit' ? 'text-gray-300' : 'text-black'}"
			contenteditable="true"
			bind:textContent={worldName}
		></h2>
	{/snippet}
</Section>

<style>
	[contenteditable]:focus {
		outline: 0px solid transparent;
	}
</style>
