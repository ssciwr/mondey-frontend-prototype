<script>
	import AbstractRegistrationForm from '$lib/components/DataInput/AbstractRegistrationForm.svelte';
	const data = [
		{
			label: 'Benutzername',
			type: 'text',
			placeholder: 'Wählen sie einen beliebigen Benutzernamen'
		},
		{
			label: 'E-Mail (optional)',
			type: 'text',
			placeholder: 'E-Mail'
		},
		{
			label: 'Passwort',
			type: 'text',
			placeholder: 'Passwort'
		},
		{
			label: 'Passwort wiederholen',
			type: 'text',
			placeholder: 'Passwort wiederholen'
		}
	];
	const heading = 'Als neuer Benutzer registrieren';
	const buttonLabel = 'Weiter';
</script>

<div class="flex">
	<AbstractRegistrationForm {data} {heading} {buttonLabel} />
</div>
