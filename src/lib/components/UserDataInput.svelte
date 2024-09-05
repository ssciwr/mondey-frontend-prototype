<script lang="ts">
	import { goto } from '$app/navigation';
	import AlertMessage from '$lib/components/AlertMessage.svelte';
	import Input from '$lib/components/DataInput/Input.svelte';
	import Select from '$lib/components/DataInput/Select.svelte';
	import NavigationButtons from '$lib/components/Navigation/NavigationButtons.svelte';
	import { children } from '$lib/stores/childrenStore';
	import { users } from '$lib/stores/userStore';
	import { Card, Heading } from 'flowbite-svelte';
	import { onDestroy, onMount } from 'svelte';

	onMount(() => {
		users.load();
		toBeRegistered = users.get()['toBeRegistered'];
	});

	onDestroy(() => {
		users.save();
	});

	// validation / data acceptance
	async function acceptData() {
		missingValues = inputValues.map((v) => v === '' || v === null);

		if (missingValues.every((v) => v === false)) {
			for (let i = 0; i < inputValues.length; ++i) {
				toBeRegistered[data[i].name] = inputValues[i];
			}

			let userAddSuccess: boolean = true;

			// attempt at error handling
			try {
				await children.addUser(toBeRegistered.id);
			} catch (error) {
				showAlert = true;
				alertMessage = 'Fehler bei Registrierung: ' + error;
				userAddSuccess = false;
			}

			if (userAddSuccess) {
				try {
					await users.add(toBeRegistered.id, toBeRegistered);
				} catch (error) {
					showAlert = true;
					alertMessage = 'Fehler bei Registrierung: ' + error;
					userAddSuccess = false;
				}
			}

			if (userAddSuccess) {
				try {
					await users.remove('toBeRegistered');
				} catch (error) {
					showAlert = true;
					alertMessage = 'Fehler bei Registrierung: ' + error;
					userAddSuccess = false;
				}
			}

			if (userAddSuccess) {
				await users.setLoggedIn(toBeRegistered.id); // set newly registered user as logged in

				await children.save();

				await users.save();

				goto('/childrengallery');
			}
		} else {
			showAlert = true;
		}
	}

	// this stuff here will become backend calls in the end because that is where the data this page will be filled with
	// will come from. Hence, they are not put into a separate library or anything
	function intervalRange(size, startAt = 0, step = 1) {
		return [...Array(size).keys()].map(
			(i) => String(i * step + startAt) + '-' + String((i + 1) * step + startAt)
		);
	}

	function numericalRange(size, startAt = 0, step = 1) {
		return [...Array(size).keys()].map((i) => i * step + startAt);
	}

	const heading = 'Benutzerdaten eingeben';

	// this will can, but does not have to, come from a database later.
	const data = [
		{
			name: 'Geburtsjahr',
			items: numericalRange(100, 1920),
			about: 'Wählen sie ihr Geburtsjahr aus',
			selected: 1988,
			label: 'Geburtsjahr',
			required: true
		},
		{
			name: 'Geschlecht',
			items: ['männlich', 'weiblich', 'divers'],
			about: 'Wählen sie ihr Geschlecht aus',
			selected: 'weiblich',
			label: 'Geschlecht',
			required: true
		},
		{
			name: 'Höchster Bildungsabschluss',
			items: [
				'kein Schulabschluss',
				'Hauptschulabschluss',
				'Realschulabschluss',
				'Abitur',
				'Bachelor',
				'Master',
				'Promotion'
			],
			about: 'Wählen sie ihren höchsten Bildungsabschluss aus',
			selected: 'Realschulabschluss',
			required: true,
			label: 'Höchster Bildungsabschluss'
		},

		{
			name: 'Arbeitszeit/Woche',
			items: intervalRange(13, 0, 5),
			about:
				'Wählen sie ihre Arbeitszeit pro Woche aus. Wählen sie die Zahl, die dem tatsächlichen Wert am nächsten kommt.',
			selected: '35-40',
			label: 'Arbeitszeit/Woche',
			required: true
		},
		{
			name: 'Familieneinkommen/Jahr',
			items: intervalRange(23, 0, 5000),
			about:
				'Wählen sie ihre Jahreseinkommen aus. Wählen sie die Zahl, die dem tatsächlichen Wert am nächsten kommt.',
			selected: '50000-55000',
			label: 'Familieneinkommen/Jahr',
			required: true
		},

		{
			name: 'Beruf',
			type: 'text',
			about: 'Geben sie ihren Beruf an',
			placeholder: 'Geben sie ihren Beruf an',
			label: 'Beruf',
			required: true
		}
	];

	let toBeRegistered: Object = {};

	let inputValues = data.map(() => null);

	let missingValues = data.map(() => false);

	let showAlert: boolean = false;

	let alertMessage: string = 'Bitte füllen Sie die benötigten Felder (hervorgehoben) aus.';

	const buttons = [
		{
			label: 'Abschließen',
			onclick: acceptData
		}
	];
</script>

<!-- Show big alert message when something is missing -->
{#if showAlert}
	<AlertMessage
		title="Fehler"
		message={alertMessage}
		infopage="/info"
		infotitle="Was passiert mit den Daten"
		onclick={() => {
			showAlert = false;
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
				{#if 'items' in element}
					<Select {...element} bind:value={inputValues[i]} valid={!missingValues[i]} />
				{:else}
					<Input {element} bind:value={inputValues[i]} valid={!missingValues[i]} />
				{/if}
			{/each}
		</form>
		<NavigationButtons {buttons} />
	</Card>
</div>
