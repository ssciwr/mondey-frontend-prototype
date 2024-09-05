<script lang="ts">
	import { goto } from '$app/navigation';
	import AlertMessage from '$lib/components/AlertMessage.svelte';
	import Input from '$lib/components/DataInput/Input.svelte';
	import NavigationButtons from '$lib/components/Navigation/NavigationButtons.svelte';
	import { createDummyUser, users } from '$lib/stores/userStore';
	import { Card, Heading } from 'flowbite-svelte';
	import { onDestroy, onMount } from 'svelte';

	onMount(async () => {
		// make dummyUser if not already there
		users.load();
		if (!users.get()['dummyUser123']) {
			createDummyUser();
		}
	});

	onDestroy(async () => {
		await users.save();
	});

	function validate(): void {
		const mailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		missingValues[0] = inputValues[0] === null || inputValues[0] === ''; // username
		missingValues[1] = inputValues[1] === null || mailRegex.test(inputValues[1]) === false; // email
		missingValues[2] = inputValues[2] === null || inputValues[2] !== inputValues[3]; // password
		missingValues[3] = inputValues[3] === null || missingValues[2];
	}

	function reroute(): void {
		validate();
		if (
			missingValues.every((v) => {
				v === false;
			})
		) {
			// README: userID is username+password just as a placeholder
			users.add(inputValues[0] + inputValues[1], {
				name: inputValues[0],
				id: inputValues[0] + inputValues[1],
				role: 'user',
				password: inputValues[2]
			});
			users.save();
			goto('/userLand/userDataInput');
		} else {
			showAlert = true;
		}
	}

	const data = [
		{
			label: 'Benutzername',
			name: 'Benutzername',
			type: 'text',
			placeholder: 'Wählen sie einen beliebigen Benutzernamen',
			required: true
		},
		{
			label: 'E-Mail',
			name: 'E-Mail',
			type: 'email',
			placeholder: 'E-Mail',
			required: true
		},
		{
			label: 'Passwort',
			name: 'Passwort',
			type: 'password',
			placeholder: 'Passwort',
			required: true
		},
		{
			label: 'Passwort wiederholen',
			name: 'Passwort wiederholen',
			type: 'password',
			placeholder: 'Passwort wiederholen',
			required: true
		}
	];

	const heading = 'Als neuer Benutzer registrieren';
	let showAlert: boolean = false;
	let showCheckMessage: boolean = false;
	let missingValues: boolean[] = [false, false, false, false];
	let inputValues: (string | null)[] = [null, null, null, null];

	const buttons = [
		{
			label: 'Registrieren',
			onclick: reroute
		}
	];
</script>

<!-- Show big alert message when something is missing -->
{#if showAlert}
	<AlertMessage
		title="Fehler"
		message="Bitte füllen Sie die benötigten Felder (hervorgehoben) aus."
		infopage="/info"
		infotitle="Was passiert mit den Daten"
		onclick={() => {
			showAlert = false;
			missingValues = [];
		}}
	/>
{/if}

<!-- The actual content -->
<div class="container m-1 mx-auto w-full max-w-xl">
	<Card class="container m-1 mx-auto w-full max-w-xl">
		{#if heading}
			<Heading
				tag="h3"
				class="m-1 mb-3 p-1 text-center font-bold tracking-tight text-gray-700 dark:text-gray-400"
				>{heading}</Heading
			>
		{/if}

		<form class="m-1 mx-auto w-full flex-col space-y-6">
			{#each data as element, i}
				<Input {element} bind:value={inputValues[i]} valid={!missingValues[i]} />
			{/each}
		</form>
		<NavigationButtons {buttons} />
	</Card>
</div>
