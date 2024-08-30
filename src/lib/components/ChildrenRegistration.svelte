<script lang="ts">
	import AlertMessage from '$lib/components/AlertMessage.svelte';

	import {
		addChildData,
		addChildObservation,
		children,
		createDummyCurrent,
		createDummySummary,
		generateChildID,
		load,
		save,
		type ChildData
	} from '$lib/stores/childrenStore';

	import {
		Button,
		Card,
		Fileupload,
		Heading,
		Input,
		Label,
		Select,
		Textarea
	} from 'flowbite-svelte';

	import { onDestroy, onMount } from 'svelte';

	// data processing functions
	export function processData(element: any) {
		let component = null;
		if (element.items) {
			element.items = element.items.map((item: String) => ({
				name: item,
				value: item
			}));

			component = Select;
		} else if (element.key === 'remarks') {
			component = Textarea;
		} else if (element.key === 'image') {
			component = Fileupload;
			element.accept = ['.jpg', '.png', '.webp'];
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
	export async function submitData() {
		const childID = generateChildID(childData.name);
		await addChildData(userID, childID, childData);
		await addChildObservation(userID, childID, {
			user: userID,
			id: childID,
			summary: await createDummySummary(),
			current: await createDummyCurrent()
		});

		console.log('childData: ', childData);
	}

	export async function verifyInput() {
		let required: { [key: string]: Boolean } = {};
		childData = data.reduce((dict: any, curr) => {
			dict[curr.props.key] = curr.value;
			required[curr.props.key] = curr.props.required;
			return dict;
		}, {});

		const test = Object.entries(childData).every((kv) =>
			required[kv[0]] ? kv[1] !== undefined && kv[1] !== null : true
		);

		if (test) {
			missingValues = [];
			const childID = generateChildID(childData.name);
			// add additional data to the child
			childData['user'] = userID;
			childData['id'] = childID;
			childData['info'] = childData.remarks;
			nextpage = '/childrengallery';
			verified = true;
			showCheckMessage = false;
		} else {
			showAlert = true;
			(missingValues as Boolean[]) = Object.keys(childData).map((key) => {
				return childData[key] && required[key] ? false : true;
			});
		}
	}

	// data to display -> will later be fetched from the server
	export let heading = 'Neues Kind registrieren';

	// this can be supplied from the database
	export let rawData = [
		{
			label: 'Name',
			placeholder: 'Bitte eintragen',
			key: 'name',
			required: true
		},
		{
			label: 'Geburtsdatum',
			placeholder: 'Bitte eintragen',
			key: 'dateOfBirth',
			required: true
		},
		{
			label: 'Frühgeburt',
			items: ['ja', 'nein'],
			placeholder: 'Bitte auswählen',
			key: 'bornEarly',
			required: true
		},
		{
			label: 'Geschlecht',
			items: ['männlich', 'weiblich'],
			placeholder: 'Bitte auswählen',
			key: 'gender',
			required: true
		},
		{
			label: 'Nationalität',
			items: ['Deutschland', 'Grossbritannien', 'USA', 'China'],
			placeholder: 'Bitte auswählen',
			key: 'nationality',
			required: true
		},
		{
			label: 'Sprache',
			items: ['Deutsch', 'Englisch (UK)', 'Englisch (Us)', 'Mandarin', 'Arabisch'],
			placeholder: 'Bitte auswählen',
			key: 'language',
			required: true
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
			placeholder: 'Bitte auswählen',
			required: true
		},
		{
			label: 'Entwicklungsauffälligkeiten',
			items: ['keine', 'Hörprobleme', 'Fehlsichtigkeit', 'Sprachfehler'],
			placeholder: 'Bitte auswählen',
			key: 'developmentalIssues',
			required: true
		},
		{
			label: 'Anmerkungen',
			placeholder: 'Weitere Bemerkungen',
			key: 'remarks',
			required: false
		},
		{
			label: 'Foto',
			placeholder: 'Bitte wählen sie ein Bild aus falls gewünscht',
			key: 'image',
			required: false
		}
	];

	//  dummy user
	export let userID = 'dummyUser';

	// dummy user added to users until this page is hooked up to the user system
	try {
		children.update((childrenlist) => {
			if (userID in childrenlist) {
				throw new Error(`User token ${userID} already exists`);
			}
			childrenlist[userID] = {};
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
	let unsubscribe: Function = children.subscribe((childrenlist) => {
		save();
	});

	// rerender page if missing values or showAlert changes
	$: missingValues = [];
	$: showAlert = false;
	$: showCheckMessage = true;

	// use component lifecycle to make sure data is written and read persistently

	onMount(async () => {
		await load();
	});

	onDestroy(async () => {
		await save();
		unsubscribe();
	});
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
		{#each data as element, i}
			{#if element.props.label}
				<Label class="font-semibold text-gray-700 dark:text-gray-400">{element.props.label}</Label>
			{/if}

			{#if element.props.key === 'image'}
				<svelte:component
					this={element.component}
					class={missingValues[i] && element.props['required'] === true
						? 'bg-primary-600 text-white dark:bg-primary-600'
						: ''}
					{...element.props}
					on:change={(event) => {
						if (!(event.target === null)) {
							const image = event.target.files[0];
							// use https://svelte.dev/repl/b17c13d4f1bb40799ccf09e0841ddd90?version=4.2.19
							let reader = new FileReader();
							reader.readAsDataURL(image);
							reader.onload = (e) => {
								element.value = e.target.result;
							};
						}
					}}
				/>
			{:else}
				<svelte:component
					this={element.component}
					class={missingValues[i] && element.props['required'] === true
						? 'bg-primary-600 text-white dark:bg-primary-600'
						: ''}
					bind:value={element.value}
					{...element.props}
				/>
			{/if}
		{/each}

		<Button
			class="w-full rounded-lg bg-primary-700 px-4 py-2 font-semibold text-white hover:bg-primary-800"
			on:click={verified ? submitData : verifyInput}
			href={nextpage}
			>{verified ? 'Kind hinzufügen' : 'Klicken um Daten zu bestätigen'}
		</Button>
	</form>
</Card>
