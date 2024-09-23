import { waitLocale } from 'svelte-i18n';

export const prerender = true;

export async function load() {
	await waitLocale();
}
