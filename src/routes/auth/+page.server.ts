import { fail, redirect } from '@sveltejs/kit';
import { formSchema } from './schema';
import { zod } from 'sveltekit-superforms/adapters';

import type { Actions, PageServerLoad } from './$types';

import { PUBLIC_FRONTEND_URL } from '$env/static/public';
import { superValidate } from 'sveltekit-superforms';

export const load: PageServerLoad = async () => {
	return {
		form: await superValidate(zod(formSchema))
	};
};

export const actions: Actions = {
	signup: async ({ request, locals: { supabase } }) => {
		const formData = await request.formData();
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;

		const { error } = await supabase.auth.signUp({ email, password });
		if (error) {
			console.error(error);
			redirect(303, '/auth/error');
		} else {
			redirect(303, '/');
		}
	},
	login: async ({ request, locals: { supabase } }) => {
		const formData = await request.formData();
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;

		const { error } = await supabase.auth.signInWithPassword({ email, password });
		if (error) {
			console.error(error);
			redirect(303, '/auth/error');
		} else {
			redirect(303, '/dashboard');
		}
	},
	googleLogin: async ({ locals: { supabase } }) => {
		const { data, error } = await supabase.auth.signInWithOAuth({
			provider: 'google',
			options: {
				redirectTo: `${PUBLIC_FRONTEND_URL}/auth/callback`
			}
		});

		if (error) {
			return fail(400, {
				message: 'Google login failed'
			});
		}

		if (data.url) {
			redirect(303, data.url);
		}
	}
};
