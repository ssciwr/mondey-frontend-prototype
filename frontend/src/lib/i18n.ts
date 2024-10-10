import { init, addMessages } from 'svelte-i18n';
import { languages } from '$lib/stores/langStore';
import { getLanguages } from '$lib/client';
import de from '../locales/de.json';

export async function getI18nJson(lang_id: number) {
	const res = await fetch(`${import.meta.env.VITE_MONDEY_API_URL}/static/i18n/${lang_id}.json`);
	if (!res.ok) {
		console.log(`getI18nJson failed with status ${res.status}`);
		return {};
	}
	return await res.json();
}

async function refreshLanguage(lang: string, lang_id: number) {
	const json = await getI18nJson(lang_id);
	addMessages(lang, json);
}

export async function refreshLanguages() {
	const { data, error } = await getLanguages();
	if (!error && data) {
		languages.set(data);
		Object.entries(data).forEach(([lang, lang_id]) => {
			refreshLanguage(lang, lang_id);
		});
	}
}

// use a hard-coded copy of the DE text initially to ensure i18n works until languages are loaded by refreshLanguages
addMessages('de', de);
init({
	fallbackLocale: 'de',
	initialLocale: 'de'
});
