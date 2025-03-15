<script>
	import { Button } from '$lib/components/ui/button/index.js';

	let { data } = $props();
	// let { colors } = $derived(data);
	// $inspect(colors);

	let worldName = $state('WorldKit');
</script>

<section class="relative h-full w-full">
	<div>
		<div class="sm:mr-24">
			<h1 class="text-xl font-semibold sm:text-xl">Welcome to World Kit</h1>
			<p class="mt-2 text-base">
				Customize "WorldKit" with your world's name or upload your logo to get started.
			</p>
		</div>
		<div class="z-10 mt-4 sm:absolute sm:top-0 sm:right-0 sm:mt-0">
			<Button variant="default" href="/auth">Let's go!</Button>
		</div>
	</div>

	<div class="absolute bottom-0 left-0 w-full bg-white">
		<h2
			class="w-full border-transparent text-6xl font-bold break-words whitespace-normal sm:text-7xl md:text-9xl
			 {worldName === 'WorldKit' ? 'text-gray-300' : 'text-black'}"
			contenteditable="true"
			bind:textContent={worldName}
		></h2>
	</div>
</section>

<style>
	[contenteditable]:focus {
		outline: 0px solid transparent;
	}
</style>
