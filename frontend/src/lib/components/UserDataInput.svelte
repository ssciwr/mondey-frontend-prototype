<script lang="ts">
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import AlertMessage from '$lib/components/AlertMessage.svelte';
	import DataInput from '$lib/components/DataInput/DataInput.svelte';
	import NavigationButtons from '$lib/components/Navigation/NavigationButtons.svelte';
	import { users, type UserData } from '$lib/stores/userStore';
	import { Card, Heading, Input, Select } from 'flowbite-svelte';
	import { onDestroy, onMount } from 'svelte';

	onMount(() => {
		users.load();
		const userID = users.get()['loggedIn'] as string;
		userData = users.get()[userID] as UserData;
		inputValues = [
			userData['Geburtsjahr'] ? userData['Geburtsjahr'] : null,
			userData['Geschlecht'] ? userData['Geschlecht'] : null,
			userData['Höchster Bildungsabschluss'] ? userData['Höchster Bildungsabschluss'] : null,
			userData['Arbeitszeit/Woche'] ? userData['Arbeitszeit/Woche'] : null,
			userData['Familieneinkommen/Jahr'] ? userData['Familieneinkommen/Jahr'] : null,
			userData['Beruf'] ? userData['Beruf'] : null
		];
		buttons[0].label = 'Fertig';
	});

	onDestroy(() => {
		users.save();
	});
	// this stuff here will become backend calls in the end because that is where the data this page will be filled with
	// will come from. Hence, they are not put into a separate library or anything
	function intervalRange(size: number, startAt: number = 0, step: number = 1, asItems = false) {
		let values = [...Array(size).keys()].map(
			(i) => String(i * step + startAt) + '-' + String((i + 1) * step + startAt)
		);

		if (asItems) {
			return values.map((v) => {
				return { name: String(v), value: v };
			});
		} else {
			return values;
		}
	}

	function numericalRange(size: number, startAt: number = 0, step: number = 1, asItems = false) {
		let values = [...Array(size).keys()].map((i) => i * step + startAt);

		if (asItems) {
			return values.map((v) => {
				return { name: String(v), value: v };
			});
		} else {
			return values;
		}
	}

	// this can, but does not have to, come from a database later.
	const data = [
		{
			name: 'Geburtsjahr',
			items: numericalRange(100, 1920, 1, true),
			placeholder: 'Wählen sie ihr Geburtsjahr aus',
			label: 'Geburtsjahr',
			required: true
		},
		{
			name: 'Geschlecht',
			items: ['männlich', 'weiblich', 'divers'].map((v) => {
				return { name: String(v), value: v };
			}),
			placeholder: 'Wählen sie ihr Geschlecht aus',
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
			].map((v) => {
				return { name: String(v), value: v };
			}),
			placeholder: 'Wählen sie ihren höchsten Bildungsabschluss aus',
			required: true,
			label: 'Höchster Bildungsabschluss'
		},

		{
			name: 'Arbeitszeit/Woche',
			items: intervalRange(13, 0, 5, true),
			placeholder:
				'Wählen sie ihre Arbeitszeit pro Woche aus. Wählen sie die Zahl, die dem tatsächlichen Wert am nächsten kommt.',
			label: 'Arbeitszeit/Woche',
			required: true
		},
		{
			name: 'Familieneinkommen/Jahr',
			items: intervalRange(23, 0, 5000, true),
			placeholder:
				'Wählen sie ihre Jahreseinkommen aus. Wählen sie die Zahl, die dem tatsächlichen Wert am nächsten kommt.',
			label: 'Familieneinkommen/Jahr',
			required: true
		},

		{
			name: 'Beruf',
			type: 'text',
			placeholder: 'Geben sie ihren Beruf an',
			label: 'Beruf',
			required: true
		}
	];
	// validation / data acceptance

	function validate(): boolean {
		missingValues = inputValues.map((v) => v === '' || v === null);
		return missingValues.every((v) => v === false);
	}

	function acceptData() {
		const valid = validate();

		if (valid) {
			for (let i = 0; i < inputValues.length; ++i) {
				(userData as UserData)[data[i].name] = inputValues[i];
			}
			users.save();
			goto('/childrengallery');
		} else {
			showAlert = true;
		}
	}

	const heading = 'Benutzerdaten eingeben';

	let userData: UserData;

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
		infopage="{base}/info"
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
				<DataInput
					component={'items' in element ? Select : Input}
					bind:value={inputValues[i]}
					label={element.label}
					properties={'items' in element
						? {
								items: element.items,
								required: element.required
							}
						: { required: element.required }}
				/>
			{/each}
		</form>
		<NavigationButtons {buttons} />
	</Card>
</div>
