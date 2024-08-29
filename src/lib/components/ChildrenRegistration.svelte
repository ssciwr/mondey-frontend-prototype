<script lang="ts">
	import AlertMessage from '$lib/components/AlertMessage.svelte';
	import {
		addChildData,
		children,
		generateChildID,
		type ChildData
	} from '$lib/stores/childrenStore';
	import { Button, Card, Heading, Input, Label, Select, Textarea } from 'flowbite-svelte';
	import { onDestroy, onMount } from 'svelte';
	import { get } from 'svelte/store';

	// data processing functions
	export function processData(element: any) {
		let component = null;
		if (element.items) {
			element.items = element.items.map((item: String) => ({
				name: item,
				value: item
			}));

			component = Select;
		} else {
			component = Input;
			let type = 'text';
			if (element.label.toLowerCase().includes('datum')) {
				type = 'date';
			}
			element['type'] = type;
		}

		return {
			component: component,
			props: element,
			value: undefined
		};
	}
	// event handlers and verification function
	async function submitData() {
		addChildData(userid, generateChildID(childData.name), childData);
	}

	async function verifyInput() {
		childData = data.reduce((dict: any, curr) => {
			dict[curr.props.key] = curr.value;
			return dict;
		}, {});

		if (Object.values(childData).every((val) => val !== undefined && val !== '' && val !== null)) {
			missingValues = [];
			const childID = generateChildID(childData.name);
			// add additional data to the child
			childData['remarks'] = remarks;
			childData['user'] = userid;
			childData['id'] = childID;
			nextpage = '/childrengallery';
			verified = true;
		} else {
			showAlert = true;
			(missingValues as Boolean[]) = Object.keys(childData)
				.map((key) => (childData[key] ? false : true))
				.filter((v) => v === true);
		}
	}

	// data to display -> will later be fetched from the server
	const heading = 'Neues Kind registrieren';

	export const rawData = [
		{
			label: 'Name',
			placeholder: 'Bitte eintragen',
			key: 'name'
		},
		{
			label: 'Geburtsdatum',
			placeholder: 'Bitte eintragen',
			key: 'dateOfBirth'
		},
		{
			label: 'Frühgeburt',
			items: ['ja', 'nein'],
			placeholder: 'Bitte auswählen',
			key: 'bornEarly'
		},
		{
			label: 'Geschlecht',
			items: ['männlich', 'weiblich'],
			placeholder: 'Bitte auswählen',
			key: 'gender'
		},
		{
			label: 'Nationalität',
			items: ['Deutschland', 'Grossbritannien', 'USA', 'China'],
			placeholder: 'Bitte auswählen',
			key: 'nationality'
		},
		{
			label: 'Sprache',
			items: ['Deutsch', 'Englisch (UK)', 'Englisch (Us)', 'Mandarin', 'Arabisch'],
			placeholder: 'Bitte auswählen',
			key: 'language'
		},
		{
			label: 'Verhältnis zum Kind',
			key: 'relationship',
			items: [
				'Kind',
				'Enkelkind',
				'Neffe/Nichte',
				'Pflegekind',
				'Adoptivkind',
				'Betreuung extern',
				'Betreuung zu Hause'
			],
			placeholder: 'Bitte auswählen'
		},
		{
			label: 'Entwicklungsauffälligkeiten',
			items: ['Hörprobleme', 'Fehlsichtigkeit', 'Sprachfehler'],
			placeholder: 'Bitte auswählen',
			key: 'developmentalIssues'
		}
	];

	//  dummy user
	export const userid = 'dummyUser';

	// dummy user added to users until this page is hooked up to the user system
	try {
		children.update((childrenlist) => {
			if (userid in childrenlist) {
				throw new Error(`User token ${userid} already exists`);
			}
			childrenlist[userid] = {};
			return childrenlist;
		});
	} catch (error) {
		console.log('something went wrong when adding user: ', error);
	}

	// data
	let data = rawData.map(processData);
	let childData: ChildData;
	let verified: Boolean = false;
	let nextpage: string | null = null;
	// rerender page if missing values or showAlert changes
	$: missingValues = [];
	$: showAlert = false;
	$: remarks = '';

	// use component lifecycle to make sure data is written and read persistently
	onMount(() => {
		const stored = localStorage.getItem('children');
		const childrenlist = stored ? JSON.parse(stored) : {};
		children.set(childrenlist);
	});

	onDestroy(() => {
		localStorage.setItem('children', JSON.stringify(get(children)));
	});
</script>

<!-- Show big alert message when something is missing -->
{#if showAlert}
	<AlertMessage
		title="Fehler"
		message="Bitte füllen Sie alle Felder aus."
		lastpage="/childLand/childDataInput"
		infopage="/info"
		infotitle="Was passiert mit den Daten"
		onclick={() => {
			showAlert = false;
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
		{#each data as element, i}
			{#if element.props.label}
				<Label class="font-semibold text-gray-700 dark:text-gray-400">{element.props.label}</Label>
			{/if}
			<svelte:component
				this={element.component}
				class={missingValues[i] ? 'bg-primary-600 text-white dark:bg-primary-600' : ''}
				bind:value={element.value}
				{...element.props}
			/>
		{/each}

		<Label class="font-semibold text-gray-700 dark:text-gray-400">Anmerkungen</Label>
		<Textarea name={'remarks'} bind:value={remarks} placeholder="Bitte eintragen (optional)" />

		<Button
			class="w-full rounded-lg bg-primary-700 px-4 py-2 font-semibold text-white hover:bg-primary-800"
			on:click={verified ? submitData : verifyInput}
			href={nextpage}
			>{verified ? 'Hinzufügen' : 'Überprüfen'}
		</Button>
	</form>
</Card>
