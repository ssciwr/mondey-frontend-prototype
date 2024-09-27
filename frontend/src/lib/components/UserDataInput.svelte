<script lang="ts">
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import AlertMessage from '$lib/components/AlertMessage.svelte';
	import DataInput from '$lib/components/DataInput/DataInput.svelte';
	import NavigationButtons from '$lib/components/Navigation/NavigationButtons.svelte';
	import { users, type UserData } from '$lib/stores/userStore';
	import { Card, Heading } from 'flowbite-svelte';
	import { afterUpdate, onDestroy, onMount } from 'svelte';

	function validate(): boolean {
		missingValues = data.map((element) => element.value === '' || element.value === null);
		return missingValues.every((v) => v === false);
	}

	async function acceptData() {
		const valid = validate();
		if (valid) {
			for (let i = 0; i < data.length; ++i) {
				(userData as UserData)[data[i].props.name] = {};
				(userData as UserData)[data[i].props.name]['value'] = data[i].value;
				(userData as UserData)[data[i].props.name]['additionalValue'] = data[i].additionalValue;
			}

			if (userID) {
				await users.update(userID, userData);
			}

			await users.save();

			buttons[0].disabled = true;
			showAlert = false;
			goto('/userLand/userLandingpage');
		} else {
			showAlert = true;
		}
	}

	let userData: UserData;
	let userID: string;

	onMount(async () => {
		console.log('loading users');
		await users.load();
		userID = users.get()['loggedIn'] as string;
		userData = users.get()[userID] as UserData;

		// initialize data values to stuff that is there already if
		// data has been supplied already for that user.
		const keys = [
			'Geburtsjahr',
			'Geschlecht',
			'Höchster Bildungsabschluss',
			'Arbeitszeit/Woche',
			'Familieneinkommen/Jahr',
			'Beruf'
		];
		let allThere: boolean = false;
		for (let i = 0; i < data.length; ++i) {
			if (userData[keys[i]]) {
				data[i]['value'] = userData[keys[i]].value;
				data[i]['additionalValue'] = userData[keys[i]].additionalValue;

				if (data[i].props['selected']) {
					data[i].props['selected'] = data[i].props.items.map((e) => {
						return e.value === userData[keys[i]].value;
					});
				}
			} else {
				allThere = true;
			}
		}
		showAlert = allThere;
		console.log('loaded data: ', data);
		buttons[0].label = 'Fertig';
	});

	onDestroy(async () => {
		users.save();
	});

	afterUpdate(async () => {
		users.save();
	});

	// this can, but does not have to, come from a database later.
	export let data: any[];

	// validation / data acceptance

	const heading = 'Benutzerdaten eingeben';

	let missingValues = data.map(() => false);

	let showAlert: boolean = true;

	let alertMessage: string = 'Bitte füllen Sie die benötigten Felder (hervorgehoben) aus.';

	const buttons = [
		{
			label: 'Abschließen',
			onclick: acceptData,
			disabled: true
		}
	];
</script>

<!-- Show big alert message when something is missing -->
{#if showAlert}
	<AlertMessage
		title="Fehler"
		message={alertMessage}
		infopage={`${base}/info`}
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
					component={element.component}
					bind:value={element.value}
					bind:additionalInput={element.additionalValue}
					label={element.props.label}
					properties={element.props}
					textTrigger={element.props.textTrigger}
					eventHandlers={{
						'on:change': (e) => {
							buttons[0].disabled = false;
							if (element.onchange) {
								element.onchange(e);
							}
						},
						'on:blur': element.onblur,
						'on:click': element.onclick
					}}
					additionalEventHandlers={{
						'on:change': (e) => {
							buttons[0].disabled = false;
							if (element.additionalOnChange) {
								element.additionalOnChange(e);
							}
						},
						'on:blur': element.onblur,
						'on:click': element.onclick
					}}
				/>
			{/each}
		</form>
		<NavigationButtons {buttons} />
	</Card>
</div>
