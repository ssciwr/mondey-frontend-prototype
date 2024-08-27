<script>
	import AbstractRegistrationForm from '$lib/components/DataInput/AbstractRegistrationForm.svelte';
	import { Input } from 'flowbite-svelte';

	const props = [
		{
			componentProps: {
				label: 'Benutzername',
				type: 'text',
				placeholder: 'Wählen sie einen beliebigen Benutzernamen',
				required: true,
				about: 'Wählen sie einen beliebigen Benutzernamen'
			},
			itemComponent: Input
		},
		{
			componentProps: {
				label: 'E-Mail (optional)',
				type: 'email',
				placeholder: 'E-Mail',
				about:
					'Geben sie ihre E-mail Adresse an falls sie über aktuelle Forschungsergebnisse informiert werden möchten.'
			},
			itemComponent: Input
		},
		{
			componentProps: {
				label: 'Passwort',
				type: 'password',
				placeholder: 'Passwort',
				required: true,
				about:
					'Wählen sie ein Passwort aus. Ihr login key wird aus diesem Passwort und ihrem Benutzernamen generiert.'
			},
			itemComponent: Input
		},
		{
			componentProps: {
				label: 'Passwort wiederholen',
				type: 'password',
				placeholder: 'Passwort wiederholen',
				required: true,
				about: 'Bestätigen sie ihr Passwort'
			},
			itemComponent: Input
		}
	];

	const buttons = [
		{
			label: 'Weiter',
			href: '/userLand/userDataInput'
		}
	];

	const heading = 'Als neuer Benutzer registrieren';
</script>

<div class="container m-1 mx-auto w-full max-w-md">
	<AbstractRegistrationForm {heading} {props} {buttons} />
</div>
