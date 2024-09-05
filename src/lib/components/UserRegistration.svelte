<script>
	import AlertMessage from '$lib/components/AlertMessage.svelte';
	import { Card, Input, Heading } from 'flowbite-svelte';

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

<!-- Show big alert message when something is missing -->
{#if showAlert}
	<AlertMessage
		title="Fehler"
		message="Bitte füllen Sie mindestens die benötigten Felder (hervorgehoben) aus."
		lastpage="/childLand/childDataInput/"
		infopage="/info"
		infotitle="Was passiert mit den Daten"
		onclick={() => {
			showAlert = false;
			missingValues = [];
		}}
	/>
{/if}

{#if showCheckMessage}
	<AlertMessage
		title="Bevor es weitergeht"
		message="Bitte überprüfen sie ihre eingaben nochmals genau bevor sie weiter gehen"
		lastpage="/childLand/childDataInput"
		infopage="/"
		infotitle="Was passiert mit den Daten?"
		onclick={() => {
			showCheckMessage = false;
		}}
	/>
{/if}

<!-- The actual content -->
<Card class="container m-1 mx-auto w-full max-w-xl">
	{#if heading}
		<Heading
			tag="h3"
			class="m-1 mb-3 p-1 text-center font-bold tracking-tight text-gray-700 dark:text-gray-400"
			>{heading}</Heading
		>
	{/if}

	<form class="m-1 mx-auto w-full flex-col space-y-6">
		{#each data as element, i}{/each}
	</form>
</Card>
