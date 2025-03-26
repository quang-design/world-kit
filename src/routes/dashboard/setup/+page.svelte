<script lang="ts">
	import Section from './components/_section.svelte';
	import { Button } from '$lib/components/ui/button';
	import { Card, CardContent } from '$lib/components/ui/card';
	import { RadioGroup, RadioGroupItem } from '$lib/components/ui/radio-group';
	import { Trash } from '@lucide/svelte';
	import { Label } from '$lib/components/ui/label';
	import { Input } from '$lib/components/ui/input';
	import { Upload, Check, Plus, Loader } from '@lucide/svelte';
	import { Tabs, TabsContent, TabsList, TabsTrigger } from '$lib/components/ui/tabs';
	import SectionName from './components/section-name.svelte';
	import SectionOutline from './components/section-outline.svelte';
	import SectionLogo from './components/section-logo.svelte';
	import SectionColors from './components/section-colors.svelte';

	// Project name
	let projectName = $state('WorldKit');

	// Outline selection
	let selectedOutline = $state('blank');

	// Logo upload
	let logoFile = $state<File | null>(null);
	let logoPreview = $state('');

	// Colors
	let colors = $state([
		{ name: 'White', hex: '#FFFFFF' },
		{ name: 'Black', hex: '#000000' }
	]);

	// Fonts
	let fonts = $state<{ name: string; file: File }[]>([]);

	// Typography styles
	let typographyStyles = $state([
		{ name: 'Super', size: '72px', weight: 700, lineHeight: '1.1', sample: 'Lorem ipsum' },
		{
			name: 'Extra Large',
			size: '48px',
			weight: 700,
			lineHeight: '1.2',
			sample: 'Maecenas consequat orci sed erat sagittis semper.'
		},
		{
			name: 'Large',
			size: '32px',
			weight: 400,
			lineHeight: '1.3',
			sample:
				'Aliquam nunc risus, tristique vitae risus sed, auctor placerat est. Sed ac urna id turpis laoreet pharetra eu et mauris.'
		},
		{
			name: 'Medium Bold',
			size: '18px',
			weight: 700,
			lineHeight: '1.5',
			sample:
				'Aenean porttitor turpis ipsum, sed hendrerit lacus malesuada sed. Integer malesuada, purus id commodo varius, augue orci lobortis mauris, non scelerisque ligula diam in libero.'
		},
		{
			name: 'Medium',
			size: '18px',
			weight: 400,
			lineHeight: '1.5',
			sample:
				'Vestibulum eget euismod nulla. Curabitur sed ante suscipit, blandit purus ultrices, consectetur dui. Vivamus euismod, tellus et iaculis rutrum, arcu est auctor dolor, ut vehicula tellus.'
		},
		{
			name: 'Small Bold',
			size: '14px',
			weight: 700,
			lineHeight: '1.5',
			sample:
				'Ut pharetra vitae dolor eu ornare. Praesent rutrum bibendum condimentum. In eu aliquet orci, nec eleifend lectus.'
		},
		{
			name: 'Small',
			size: '14px',
			weight: 400,
			lineHeight: '1.5',
			sample:
				'Curabitur cursus nulla eleifend nulla aliquet tempus. Nullam eget consequat velit. Curabitur purus massa, molestie quis arcu at.'
		}
	]);

	// Handle logo upload
	function handleLogoUpload(event: Event) {
		const target = event.target as HTMLInputElement;
		const file = target?.files?.[0];
		if (file) {
			logoFile = file;
			const reader = new FileReader();
			reader.onload = (e) => {
				if (e.target?.result) {
					logoPreview = String(e.target.result);
				}
			};
			reader.readAsDataURL(file);
		}
	}

	// Handle font upload
	function handleFontUpload(event: Event) {
		const target = event.target as HTMLInputElement;
		const files = target?.files;
		if (files && files.length > 0) {
			for (let i = 0; i < files.length; i++) {
				const file = files[i];
				fonts = [...fonts, { name: file.name.split('.')[0], file }];
			}
		}
	}

	// Save setup data
	let isSaving = $state(false);
	let saveError = $state<string | null>(null);
	let saveSuccess = $state<string | null>(null);

	async function saveSetup() {
		try {
			isSaving = true;
			saveError = null;
			saveSuccess = null;

			// Upload logo if present
			let logoUrl = null;
			if (logoFile) {
				// In a real implementation, you would upload the logo to storage
				// and get back a URL to store in the database
				// For now, we'll just simulate this
				logoUrl = logoPreview;
			}

			// Prepare data for API
			const setupData = {
				projectName,
				selectedOutline,
				logoUrl,
				colors,
				fonts: fonts.map((f) => f.name), // Just send font names for now
				typographyStyles
			};

			// Send data to API
			const response = await fetch('/api/setup', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(setupData)
			});

			const result = await response.json();

			if (!response.ok) {
				throw new Error(result.error || 'Failed to save setup data');
			}

			saveSuccess = 'Setup completed successfully!';

			// Redirect to dashboard after a short delay
			setTimeout(() => {
				window.location.href = '/dashboard';
			}, 2000);
		} catch (error) {
			console.error('Error saving setup:', error);
			const err = error instanceof Error ? error : new Error('An unexpected error occurred');
			saveError = err.message;
		} finally {
			isSaving = false;
		}
	}
</script>

<div class="container mx-auto space-y-16 py-8">
	<SectionName {projectName} />
	<SectionOutline bind:selectedOutline />
	<SectionLogo bind:logoFile bind:logoPreview />
	<SectionColors bind:colors />

	<!-- Upload fonts -->
	<Section
		title="Upload fonts"
		description="Upload your brand's fonts, .WOFF or .WOFF2 file types preferred, one font weight per file. These can automatically populate sections of your outline. You can replace or add more later."
	>
		{#snippet content()}
			<div class="mt-4 space-y-4">
				<p class="text-sm text-gray-500 dark:text-gray-400">
					<a href="/help/fonts" class="text-blue-500 hover:underline"
						>Read more about uploading fonts here</a
					>.
				</p>

				<div
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
						onchange={handleFontUpload}
						id="font-upload"
					/>
				</div>

				{#if fonts.length > 0}
					<div class="mt-4">
						<h4 class="mb-2 text-sm font-medium">Uploaded Fonts</h4>
						<div class="space-y-2">
							{#each fonts as font}
								<div
									class="flex items-center justify-between rounded-md bg-gray-50 p-3 dark:bg-gray-800"
								>
									<span>{font.name}</span>
									<Button variant="ghost" size="sm" class="text-red-500 hover:text-red-700">
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

	<!-- Define type styles -->
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

	<!-- Save button -->
	<div class="mt-8 flex flex-col items-end space-y-4">
		{#if saveError}
			<div
				class="mb-4 w-full rounded-lg bg-red-100 p-4 text-sm text-red-700 dark:bg-red-200 dark:text-red-800"
				role="alert"
			>
				<span class="font-medium">Error:</span>
				{saveError}
			</div>
		{/if}

		{#if saveSuccess}
			<div
				class="mb-4 w-full rounded-lg bg-green-100 p-4 text-sm text-green-700 dark:bg-green-200 dark:text-green-800"
				role="alert"
			>
				<span class="font-medium">Success:</span>
				{saveSuccess}
			</div>
		{/if}

		<Button onclick={saveSetup} disabled={isSaving}>
			{#if isSaving}
				<Loader class="mr-3 -ml-1 h-5 w-5 animate-spin text-white" />
				Saving...
			{:else}
				Save and Continue
			{/if}
		</Button>
	</div>
</div>
