<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Card, CardContent } from '$lib/components/ui/card';
	import { RadioGroup, RadioGroupItem } from '$lib/components/ui/radio-group';
	import { Trash } from '@lucide/svelte';
	import { Label } from '$lib/components/ui/label';
	import { Input } from '$lib/components/ui/input';
	import { Upload, Check, Plus, Loader } from '@lucide/svelte';
	import { Tabs, TabsContent, TabsList, TabsTrigger } from '$lib/components/ui/tabs';
	import SectionName from '$lib/components/section-name.svelte';
	import SectionOutline from '$lib/components/section-outline.svelte';
	import SectionLogo from '$lib/components/section-logo.svelte';
	import SectionColors from '$lib/components/section-colors.svelte';
	import SectionFonts from '$lib/components/section-fonts.svelte';
	import SectionTypography from '$lib/components/section-typography.svelte';

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
	let fonts = $state<{ name: string; file: File | null; source?: string; url?: string }[]>([]);

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
	<SectionFonts bind:fonts />
	<SectionTypography bind:typographyStyles />

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
