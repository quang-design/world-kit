<script lang="ts">
	import type { PageData } from './$types';
	import LoginForm from './login-form.svelte';

	let { data }: { data: PageData } = $props();
</script>

<section class="flex h-full w-full flex-col items-center justify-center">
	<div class="px-auto w-full max-w-md sm:px-6">
		<LoginForm {data} />
	</div>
</section>
