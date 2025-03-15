import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async (event) => {
	const {
		url,
		locals: { supabase }
	} = event;
	const code = url.searchParams.get('code') as string;
	// const next = url.searchParams.get('next') ?? '/dashboard';

	if (code) {
		await supabase.auth.exchangeCodeForSession(code);
		// const { error } = await supabase.auth.exchangeCodeForSession(code);
		// if (!error) {
		// 	throw redirect(303, `/${next.slice(1)}`);
		// }
	}

	const sessionData = await supabase.auth.getSession();

	if (sessionData.data.session) {
		console.log('Session data:', sessionData.data.session.user);
		throw redirect(303, '/dashboard');
	}

	// return the user to an error page with instructions
	throw redirect(303, '/auth/auth-code-error');
};
