import { register, init } from 'svelte-i18n';
import { lang_id, languages } from '$lib/stores/adminStore';

register('de', () => import('../locales/de.json'));
register('en', () => import('../locales/en.json'));

init({
	fallbackLocale: 'de',
	initialLocale: 'de'
});

export async function updateLanguages() {
	try {
		const res = await fetch(`${import.meta.env.VITE_MONDEY_API_URL}/languages`, {
			method: 'GET',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json'
			}
		});
		if (res.status === 200) {
			languages.set(await res.json());
		}
	} catch (e) {
		console.error(e);
	}
}
