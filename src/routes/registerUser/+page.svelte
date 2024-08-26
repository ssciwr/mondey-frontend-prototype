<script>
	import AbstractContent from '$lib/components/AbstractContent.svelte';
	import AbstractDropdownItem from '$lib/components/DataInput/AbstractDropdownItem.svelte';
	import AbstractRegistrationForm from '$lib/components/DataInput/AbstractRegistrationForm.svelte';
	import { Input } from 'flowbite-svelte';

	const props = [
		{
			componentProps: {
				label: 'Benutzername',
				type: 'text',
				placeholder: 'Wählen sie einen beliebigen Benutzernamen',
				required: true
			},
			itemComponent: Input
		},
		{
			componentProps: {
				label: 'E-Mail (optional)',
				type: 'email',
				placeholder: 'E-Mail'
			},
			itemComponent: Input
		},
		{
			componentProps: {
				label: 'Passwort',
				type: 'password',
				placeholder: 'Passwort',
				required: true
			},
			itemComponent: Input
		},
		{
			componentProps: {
				label: 'Passwort wiederholen',
				type: 'password',
				placeholder: 'Passwort wiederholen',
				required: true
			},
			itemComponent: Input
		},
		{
			componentProps: {
				name: 'Benutzerrolle',
				items: ['Benutzer/in', 'Admin', 'Forscher/in'],
				about: 'Welche Rolle soll der neue Benutzer haben?',
				selected: 'Benutzer/in'
			},
			itemComponent: AbstractDropdownItem
		}
	];
	const heading = 'Als neuer Benutzer registrieren';
	const buttonLabel = 'Weiter';
	const href = '/registerUser/userDataInput';
</script>

<div class="m-1 w-full max-w-md items-center justify-center">
	<AbstractContent infopage={'/info'} nextpage={'/registerUser/userDataInput'}>
		<AbstractRegistrationForm {heading} {href} {props} />
	</AbstractContent>
</div>
