<script lang="ts">
	import * as Form from '$lib/components/ui/form/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { formSchema, type FormSchema } from './schema';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';

	import GoogleLogo from './_assets/google-logo.svelte';

	let { data }: { data: { form: SuperValidated<Infer<FormSchema>> } } = $props();

	const form = superForm(data.form, {
		validators: zodClient(formSchema)
	});

	const { form: formData, enhance } = form;
	let isSignup = $state(false);
</script>

<form method="POST" action={isSignup ? '?/signup' : '?/login'} use:enhance class="w-full">
	<Form.Field {form} name="email">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Email</Form.Label>
				<Input {...props} type="email" bind:value={$formData.email} class="w-full" />
			{/snippet}
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Field {form} name="password">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Password</Form.Label>
				<Input {...props} type="password" bind:value={$formData.password} class="w-full" />
			{/snippet}
		</Form.Control>
		<Form.Description>Password must be at least 6 characters.</Form.Description>
		<Form.FieldErrors />
	</Form.Field>

	<div class="mt-4 flex w-full flex-col gap-4 sm:flex-row">
		<Form.Button onclick={() => (isSignup = false)} class="w-full">Login</Form.Button>
		<Form.Button variant="outline" onclick={() => (isSignup = true)} class="w-full"
			>Signup</Form.Button
		>
	</div>
</form>

<div class="flex items-center gap-4">
	<div class="h-[1px] w-full bg-gray-200"></div>
	<p class="my-4 text-center">OR</p>
	<div class="h-[1px] w-full bg-gray-200"></div>
</div>

<form method="POST" action="?/googleLogin" class="w-full">
	<Form.Button variant="default" class="w-full">
		<GoogleLogo />
		Sign in with Google
	</Form.Button>
</form>
