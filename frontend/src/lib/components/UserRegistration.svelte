<script lang="ts">
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import AlertMessage from '$lib/components/AlertMessage.svelte';
	import Input from '$lib/components/DataInput/Input.svelte';
	import NavigationButtons from '$lib/components/Navigation/NavigationButtons.svelte';
	import { children } from '$lib/stores/childrenStore';
	import { hash, users } from '$lib/stores/userStore';
	import { Card, Heading } from 'flowbite-svelte';
	import { onDestroy, onMount } from 'svelte';

	onMount(async () => {
		// make dummyUser if not already there
		users.load();
	});

	onDestroy(async () => {
		await users.save();
	});

	function validate(): void {
		const mailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		missingValues[0] = inputValues[0] === null || inputValues[0] === ''; // username
		missingValues[1] = inputValues[1] === null || mailRegex.test(inputValues[1]) === false; // email
		missingValues[2] = passwd == null || passwd !== passwdTest; // password
		missingValues[3] = inputValues[3] === null || missingValues[2];
	}

	async function reroute(): Promise<void> {
		validate();

		if (
			missingValues.every((v) => {
				return v === false;
			})
		) {
			// README: userID is username+password just as a placeholder
			const userID = inputValues[0] + passwd;
			let userAddSuccess: boolean = true;

			let userdata = {
				name: inputValues[0],
				id: userID, // README: without the backend, userID is emulated as username + password
				role: 'user',
				password: passwd
			};

			try {
				await users.add(userID, userdata);
			} catch (error) {
				userAddSuccess = false;
				showAlert = true;
				alertMessage = 'Fehler bei Registrierung' + error;
			}

			try {
				await children.addUser(userID);
			} catch (error) {
				showAlert = true;
				alertMessage = 'Fehler bei Registrierung: ' + error;
				userAddSuccess = false;
			}

			if (userAddSuccess) {
				try {
					await users.save();
				} catch (error) {
					showAlert = true;
					alertMessage = 'Fehler bei Registrierung' + error;
					userAddSuccess = false;
				}
			}

			if (userAddSuccess) {
				try {
					await children.save();
				} catch (error) {
					showAlert = true;
					alertMessage = 'Fehler bei Registrierung' + error;
					userAddSuccess = false;
				}
			}

			if (userAddSuccess) {
				try {
					await users.setLoggedIn(userID); // set newly registered user as logged in
				} catch (error) {
					showAlert = true;
					alertMessage = 'Fehler bei Registrierung' + error;
					userAddSuccess = false;
				}
			}
			showAlert = false;
			goto(`${base}/${'userLand/userDataInput'}`);
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
			required: true,
			onBlur: async (event: Event) => {
				passwd = await hash(event.srcElement.value);
			}
		},
		{
			label: 'Passwort wiederholen',
			name: 'Passwort wiederholen',
			type: 'password',
			placeholder: 'Passwort wiederholen',
			required: true,
			onBlur: async (event: Event) => {
				passwdTest = await hash(event.srcElement.value);
			}
		}
	];

	const heading = 'Als neuer Benutzer registrieren';
	let showAlert: boolean = false;
	let alertMessage: string = 'Bitte füllen Sie die benötigten Felder (hervorgehoben) aus.';
	let missingValues: boolean[] = [false, false, false, false];
	let inputValues: (string | null)[] = [null, null, null, null];
	let passwd = '';
	let passwdTest = '';
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
		message={alertMessage}
		infopage="{base}/info"
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
				<Input
					{element}
					bind:value={inputValues[i]}
					valid={!missingValues[i]}
					onBlur={element.onBlur}
				/>
			{/each}
		</form>
		<NavigationButtons {buttons} />
	</Card>
</div>
