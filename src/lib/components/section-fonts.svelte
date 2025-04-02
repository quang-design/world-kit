<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Badge } from '$lib/components/ui/badge';
	import { Upload, Trash, Plus } from '@lucide/svelte';
	import Section from './_section.svelte';
	import { Tabs, TabsContent, TabsList, TabsTrigger } from '$lib/components/ui/tabs';
	import { Input } from '$lib/components/ui/input';
	import { PUBLIC_GOOGLE_FONTS_API_KEY } from '$env/static/public';

	// Define exposed props with bindable
	let { fonts = $bindable([]) } = $props<{
		fonts: Array<{ name: string; file: File | null; source?: string; url?: string }>;
	}>();

	// Tabs state
	let activeTab = $state('upload');

	// Google Fonts state
	let googleFonts = $state<GoogleFont[]>([]);
	let filteredFonts = $state<GoogleFont[]>([]);
	let searchQuery = $state('');
	let isLoading = $state(false);
	let error = $state<string | null>(null);

	// Update filtered fonts whenever search query changes
	$effect(() => {
		if (searchQuery.trim() === '') {
			filteredFonts = googleFonts;
		} else {
			const query = searchQuery.toLowerCase();
			filteredFonts = googleFonts.filter(
				(font) =>
					font.family.toLowerCase().includes(query) || font.category.toLowerCase().includes(query)
			);
		}
	});

	// Font preview/selection state
	let selectedFont = $state<GoogleFont | null>(null);

	// Interface for Google Font data
	interface GoogleFont {
		family: string;
		variants: string[];
		files?: Record<string, string>;
		category: string;
	}

	// Handle font upload
	function handleFontUpload(event: Event) {
		const target = event.target as HTMLInputElement;
		const files = target?.files;
		if (files && files.length > 0) {
			for (let i = 0; i < files.length; i++) {
				const file = files[i];
				fonts = [...fonts, { name: file.name.split('.')[0], file, source: 'upload' }];
			}
		}
	}

	// Fetch Google Fonts
	async function fetchGoogleFonts() {
		try {
			isLoading = true;
			error = null;

			const response = await fetch(
				`https://www.googleapis.com/webfonts/v1/webfonts?key=${PUBLIC_GOOGLE_FONTS_API_KEY}&sort=popularity`
			);

			if (!response.ok) {
				throw new Error('Failed to fetch Google Fonts');
			}

			const data = await response.json();
			googleFonts = data.items || [];
			filteredFonts = googleFonts;
		} catch (err) {
			console.error('Error fetching Google Fonts:', err);
			error = err instanceof Error ? err.message : 'Failed to load Google Fonts';
		} finally {
			isLoading = false;
		}
	}

	// Select a Google Font to view details
	function selectFont(font: GoogleFont) {
		selectedFont = font;
	}

	// Add a Google Font to your list
	function addGoogleFont() {
		if (!selectedFont) return;

		// Default to regular variant if available, otherwise first variant
		const variant = selectedFont.variants.includes('regular')
			? 'regular'
			: selectedFont.variants[0];

		// Get the URL for the selected variant
		const fontUrl = selectedFont.files?.[variant] || '';

		// Add to fonts list
		fonts = [
			...fonts,
			{
				name: `${selectedFont.family} ${variant !== 'regular' ? variant : ''}`.trim(),
				file: null,
				source: 'google',
				url: fontUrl
			}
		];

		// Clear selection
		selectedFont = null;
	}

	// Remove a font
	function removeFont(index: number) {
		fonts = fonts.filter((_: any, i: number) => i !== index);
	}

	// Load Google Fonts when component initializes
	$effect(() => {
		fetchGoogleFonts();
	});
</script>

<Section
	title="Fonts"
	description="Choose your brand's fonts from your files or Google Fonts. These can automatically populate sections of your outline. You can replace or add more later."
>
	{#snippet content()}
		<div class="mt-4 space-y-6">
			<Tabs bind:value={activeTab} class="w-full">
				<TabsList class="grid w-full grid-cols-2">
					<TabsTrigger value="upload">Upload Fonts</TabsTrigger>
					<TabsTrigger value="google">Google Fonts</TabsTrigger>
				</TabsList>

				<TabsContent value="upload" class="mt-4 space-y-4">
					<p class="text-sm text-gray-500 dark:text-gray-400">
						<a href="/help/fonts" class="text-blue-500 hover:underline">
							Read more about uploading fonts here.
						</a>
					</p>

					<label
						for="font-upload"
						class="flex h-48 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-6 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800"
					>
						<div class="flex flex-col items-center justify-center text-center">
							<Upload class="h-12 w-12 text-gray-400" />
							<p class="mt-2 text-sm text-gray-500 dark:text-gray-400">
								Click or drag to upload fonts
							</p>
						</div>
						<input
							type="file"
							class="hidden"
							accept=".woff,.woff2,.ttf,.otf"
							multiple
							onchange={(event) => handleFontUpload(event)}
							id="font-upload"
						/>
					</label>
				</TabsContent>

				<TabsContent value="google" class="mt-4 space-y-4">
					<div>
						<Input
							type="text"
							placeholder="Search Google Fonts..."
							bind:value={searchQuery}
							class="w-full"
						/>
					</div>

					{#if isLoading}
						<div class="flex h-48 items-center justify-center">
							<div class="text-center">
								<div
									class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em]"
								></div>
								<p class="mt-2 text-sm text-gray-500 dark:text-gray-400">Loading fonts...</p>
							</div>
						</div>
					{:else if error}
						<div class="rounded-md bg-red-50 p-4 dark:bg-red-900/20">
							<p class="text-sm text-red-800 dark:text-red-200">{error}</p>
							<Button variant="outline" class="mt-2" onclick={() => fetchGoogleFonts()}>
								Try Again
							</Button>
						</div>
					{:else if selectedFont}
						<!-- Font Preview & Selection -->
						<div class="rounded-lg border p-4 dark:border-gray-700">
							<div class="flex items-center justify-between">
								<h3 class="text-lg font-medium">{selectedFont.family}</h3>
								<div>
									<Button variant="outline" class="mr-2" onclick={() => (selectedFont = null)}
										>Back</Button
									>
									<Button onclick={() => addGoogleFont()}>
										<Plus class="mr-2 h-4 w-4" /> Add Font
									</Button>
								</div>
							</div>
							<p class="mt-1 text-xs text-gray-500">
								{selectedFont.category} · {selectedFont.variants.length} variants
							</p>

							<!-- Font previews -->
							<div class="mt-4 space-y-4">
								<p style="font-family: '{selectedFont.family}', sans-serif; font-size: 36px;">
									The quick brown fox jumps over the lazy dog
								</p>
								<p style="font-family: '{selectedFont.family}', sans-serif; font-size: 18px;">
									ABCDEFGHIJKLMNOPQRSTUVWXYZ<br />
									abcdefghijklmnopqrstuvwxyz<br />
									1234567890!@#$%^&*()_+
								</p>
							</div>
						</div>
					{:else}
						<!-- Font List -->
						<div
							class="grid max-h-96 grid-cols-1 gap-2 overflow-y-auto sm:grid-cols-2 lg:grid-cols-3"
						>
							{#if filteredFonts.length === 0}
								<div class="col-span-full py-8 text-center">
									<p class="text-gray-500">No fonts found matching your search</p>
								</div>
							{:else}
								{#each filteredFonts as font}
									<Button
										variant="outline"
										class="h-auto justify-start p-3"
										onclick={() => selectFont(font)}
									>
										<div class="text-left">
											<p
												style="font-family: '{font.family}', sans-serif;"
												class="truncate font-medium"
											>
												{font.family}
											</p>
											<p class="text-xs text-gray-500">{font.category}</p>
										</div>
									</Button>
								{/each}
							{/if}
						</div>
					{/if}
				</TabsContent>
			</Tabs>

			<!-- Selected Fonts List (Common to both tabs) -->
			{#if fonts.length > 0}
				<div class="mt-6">
					<h4 class="mb-2 text-sm font-medium">Selected Fonts</h4>
					<div class="space-y-2">
						{#each fonts as font, i}
							<div
								class="flex items-center justify-between rounded-md bg-gray-50 p-3 dark:bg-gray-800"
							>
								<div class="flex items-center gap-2">
									<span>{font.name}</span>
									{#if font.source === 'google'}
										<Badge class="text-xs" variant="info">Google</Badge>
									{/if}
								</div>
								<Button
									variant="ghost"
									size="sm"
									class="text-red-500 hover:text-red-700"
									onclick={() => removeFont(i)}
								>
									<Trash class="h-5 w-5" />
								</Button>
							</div>
						{/each}
					</div>
				</div>
			{/if}
		</div>
	{/snippet}
</Section>
