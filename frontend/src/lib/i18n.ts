import { register, init } from 'svelte-i18n';
import { lang_id, languages } from '$lib/stores/adminStore';
import { getLanguages } from '$lib/client';

register('de', () => import('../locales/de.json'));
register('en', () => import('../locales/en.json'));

init({
	fallbackLocale: 'de',
	initialLocale: 'de'
});

export async function updateLanguages() {
	const { data, error } = await getLanguages();
	if (!error && data) {
		languages.set(data);
	}
}
