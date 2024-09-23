import { register, init, getLocaleFromNavigator } from 'svelte-i18n';

register('de', () => import('../locales/de.json'));
register('en', () => import('../locales/en.json'));

init({
	fallbackLocale: 'de',
	initialLocale: 'de'
});
