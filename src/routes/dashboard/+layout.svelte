<script>
	import { goto } from '$app/navigation';
	import Button from '$lib/components/ui/button/button.svelte';
	import { Plus, Menu, X } from '@lucide/svelte';

	let { data, children } = $props();
	let { supabase } = $derived(data);
	let mobileMenuOpen = $state(false);

	const logout = async () => {
		const { error } = await supabase.auth.signOut();
		if (error) {
			console.error(error);
		}
		goto('/auth');
	};

	const toggleMobileMenu = () => {
		mobileMenuOpen = !mobileMenuOpen;
	};
</script>

<header class="relative w-full border-b border-gray-100 pb-4">
	<!-- Desktop Navigation -->
	<div class="flex items-center justify-between">
		<nav>
			<a href="/dashboard" class="text-2xl text-gray-300">Dashboard</a>
		</nav>

		<Button variant="outline" size="sm" onclick={toggleMobileMenu} class="md:hidden">
			{#if mobileMenuOpen}
				<X class="h-6 w-6" />
			{:else}
				<Menu class="h-6 w-6" />
			{/if}
		</Button>

		<div class="hidden gap-4 md:flex">
			<Button variant="default" size="sm" href="/setup">
				<Plus class="mr-1 h-4 w-4" />
				Create a World
			</Button>
			<Button variant="outline" size="sm" onclick={logout}>Logout</Button>
		</div>
	</div>

	{#if mobileMenuOpen}
		<div
			class="absolute z-99 mt-2 flex w-full flex-col gap-2 rounded-b-lg border border-gray-200 bg-white p-4 md:hidden"
		>
			<Button variant="default" size="sm" href="/setup" class="w-full justify-center">
				<Plus class="mr-1 h-4 w-4" />
				Create a World
			</Button>
			<Button variant="outline" size="sm" onclick={logout} class="w-full justify-center">
				Logout
			</Button>
		</div>
	{/if}
</header>
<main>
	{@render children()}
</main>
