<script>
	let { title, description, content } = $props();
</script>

<section class="mt-8 mb-24 w-full bg-white dark:bg-gray-800">
	<h2 class="mb-1 text-base font-bold text-gray-900 dark:text-white">{title}</h2>
	<p class="mb-1 text-sm text-gray-400 dark:text-gray-600">{description}</p>
	<div class="w-full">
		{@render content()}
	</div>
</section>
