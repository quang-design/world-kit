<script lang="ts">
	import Section from './_section.svelte';
	import { Button } from '$lib/components/ui/button';
	import { Upload, Trash2 } from '@lucide/svelte';
	import { Toggle } from '$lib/components/ui/toggle';

	// Logo upload
	let { logoFile = $bindable(null as File | null), logoPreview = $bindable('') } = $props();

	// Background toggle state
	let darkBackground = $state(true);

	// Handle logo upload via input
	function handleLogoUpload(event: Event) {
		const target = event.target as HTMLInputElement;
		const file = target?.files?.[0];
		if (file) {
			processFile(file);
		}
	}

	// Process the uploaded file
	function processFile(file: File) {
		if (isValidFileType(file)) {
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

	// Delete the uploaded logo
	function deleteLogo() {
		logoFile = null;
		logoPreview = '';
	}

	// Check if file type is valid
	function isValidFileType(file: File): boolean {
		const validTypes = [
			'.svg',
			'.png',
			'.eps',
			'image/svg+xml',
			'image/png',
			'application/postscript'
		];
		return validTypes.some((type) => {
			if (type.startsWith('.')) {
				return file.name.toLowerCase().endsWith(type);
			}
			return file.type === type;
		});
	}

	// Handle drag and drop events
	let isDragging = $state(false);

	function handleDragEnter(event: DragEvent) {
		event.preventDefault();
		event.stopPropagation();
		isDragging = true;
	}

	function handleDragLeave(event: DragEvent) {
		event.preventDefault();
		event.stopPropagation();
		isDragging = false;
	}

	function handleDragOver(event: DragEvent) {
		event.preventDefault();
		event.stopPropagation();
	}

	function handleDrop(event: DragEvent) {
		event.preventDefault();
		event.stopPropagation();
		isDragging = false;

		const files = event.dataTransfer?.files;
		if (files && files.length > 0) {
			processFile(files[0]);
		}
	}

	// Get file name from preview URL
	function getFileName(): string {
		if (logoFile) {
			return logoFile.name;
		}
		return '';
	}
</script>

<!-- Upload primary logo -->
<Section
	title="Upload primary logo"
	description="Upload a logo for your project. This can automatically populate sections of your outline. You can replace or add more later."
>
	{#snippet content()}
		<div class="mt-4 space-y-4">
			<p class="text-sm text-gray-500 dark:text-gray-400">
				Save logo files as SVGs with no background color and the bounding box cropped close to the
				logo.
				<a href="/help/assets" class="text-blue-500 hover:underline"
					>Read more on preparing assets here</a
				>.
			</p>

			<!-- Dropzone area -->
			<div class="max-w-sm">
				{#if logoPreview}
					<!-- Logo preview with controls -->
					<div class="flex flex-col">
						<!-- Square preview container -->
						<div
							class="relative aspect-square w-full overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700"
						>
							<!-- Main preview area with checkerboard pattern -->
							<div
								class="flex h-full w-full items-center justify-center {darkBackground
									? 'bg-gray-800'
									: 'bg-gray-100'}"
								style="background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj48cmVjdCB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIGZpbGw9IiNjY2NjY2MiIG9wYWNpdHk9IjAuNCIvPjxyZWN0IHg9IjEwIiB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIGZpbGw9IiNmNWY1ZjUiIG9wYWNpdHk9IjAuNCIvPjxyZWN0IHk9IjEwIiB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIGZpbGw9IiNmNWY1ZjUiIG9wYWNpdHk9IjAuNCIvPjxyZWN0IHg9IjEwIiB5PSIxMCIgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiBmaWxsPSIjY2NjY2NjIiBvcGFjaXR5PSIwLjQiLz48L3N2Zz4='); background-repeat: repeat;"
							>
								<img
									src={logoPreview}
									alt="Logo preview"
									class="max-h-[80%] max-w-[80%] object-contain"
								/>
							</div>

							<!-- Dark/Light toggle floating at bottom -->
							<div
								class="absolute bottom-4 left-1/2 flex -translate-x-1/2 overflow-hidden rounded-md border border-gray-200 shadow-md dark:border-gray-700"
							>
								<button
									class="px-3 py-1 text-xs font-medium {darkBackground
										? 'bg-gray-800 text-white'
										: 'bg-transparent text-gray-700 dark:text-gray-300'}"
									onclick={() => (darkBackground = true)}
								>
									Dark
								</button>
								<button
									class="px-3 py-1 text-xs font-medium {!darkBackground
										? 'bg-gray-100 text-gray-800'
										: 'bg-transparent text-gray-700 dark:text-gray-300'}"
									onclick={() => (darkBackground = false)}
								>
									Light
								</button>
							</div>
						</div>

						<!-- Filename and delete button outside the image -->
						<div class="mt-2 flex items-center justify-between px-1">
							<div class="max-w-[80%] truncate text-sm font-medium">
								{getFileName()}
							</div>
							<button
								class="rounded-full p-1 text-gray-500 transition-colors hover:bg-gray-100 hover:text-red-500 dark:hover:bg-gray-800"
								onclick={deleteLogo}
								type="button"
								title="Delete logo"
							>
								<Trash2 class="h-4 w-4" />
							</button>
						</div>
					</div>
				{:else}
					<!-- Empty dropzone -->
					<label
						for="logo-upload"
						class="block w-full cursor-pointer"
						ondragenter={handleDragEnter}
						ondragleave={handleDragLeave}
						ondragover={handleDragOver}
						ondrop={handleDrop}
					>
						<div
							class="flex aspect-square w-full flex-col items-center justify-center rounded-lg border-2 {isDragging
								? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
								: 'border-dashed border-gray-300'} transition-colors hover:bg-gray-50 dark:hover:bg-gray-800"
						>
							<Upload class="mb-2 h-12 w-12 text-gray-400" />
							<p class="text-sm text-gray-500 dark:text-gray-400">Click or drag to upload logo</p>
							<p class="mt-1 text-xs text-gray-400 dark:text-gray-500">
								Supports SVG, PNG, and EPS files
							</p>
						</div>
					</label>
				{/if}
				<input
					type="file"
					class="hidden"
					accept=".svg,.png,.eps,image/svg+xml,image/png,application/postscript"
					onchange={handleLogoUpload}
					id="logo-upload"
				/>
			</div>
		</div>
	{/snippet}
</Section>
