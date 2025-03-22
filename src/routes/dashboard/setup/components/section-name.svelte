<script lang="ts">
	import Section from './_section.svelte';

	let { projectName = $bindable(), ...props } = $props();
</script>

<Section
	title="Name project"
	description="Give your project a name. This could be the name of a brand."
	{...props}
>
	{#snippet content()}
		<h2
			class="w-full max-w-full border-transparent text-4xl font-bold break-all whitespace-normal sm:text-6xl md:text-8xl
        {projectName === 'WorldKit' ? 'text-gray-300' : 'text-black'}"
			contenteditable="true"
			bind:textContent={projectName}
		></h2>
	{/snippet}
</Section>

<style>
	[contenteditable]:focus {
		outline: 0px solid transparent;
	}
</style>
