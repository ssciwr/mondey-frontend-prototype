<script lang="ts">
	import AlertMessage from '$lib/components/AlertMessage.svelte';
	import { Button, Card, Heading, Input, Label, Select, Textarea } from 'flowbite-svelte';

	// data processing functions
	function processData(element: any) {
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
	// event handlers
	function onSubmit() {
		let childData = data.reduce((dict: any, curr) => {
			dict[curr.props.label] = curr.value;
			return dict;
		}, {});

		if (Object.values(childData).every((val) => val !== undefined && val !== '' && val !== null)) {
			missing_values = [];
			childData['remarks'] = remarks;
			console.log(childData);
			return childData;
		} else {
			showAlert = true;
			(missing_values as Boolean[]) = Object.keys(childData)
				.map((key) => (childData[key] ? false : true))
				.filter((v) => v === true);
		}
	}

	// data to display -> will later be fetched from the server
	const heading = 'Neues Kind registrieren';

	const rawData = [
		{
			label: 'Name',
			placeholder: 'Bitte eintragen'
		},
		{
			label: 'Geburtsdatum',
			placeholder: 'Bitte eintragen'
		},
		{
			label: 'Frühgeburt',
			items: ['ja', 'nein'],
			placeholder: 'Bitte auswählen'
		},
		{
			label: 'Geschlecht',
			items: ['männlich', 'weiblich'],
			placeholder: 'Bitte auswählen'
		},
		{
			label: 'Nationalität',
			items: ['Deutschland', 'Grossbritannien', 'USA', 'China'],
			placeholder: 'Bitte auswählen'
		},
		{
			label: 'Sprache',
			items: ['Deutsch', 'Englisch (UK)', 'Englisch (Us)', 'Mandarin', 'Arabisch'],
			placeholder: 'Bitte auswählen'
		},
		{
			label: 'Verhältnis zum Kind',
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
			placeholder: 'Bitte auswählen'
		}
	];
	// rerender page if missing values or showAlert changes

	let data = rawData.map(processData);
	$: missing_values = [];
	$: showAlert = false;
	$: remarks = '';
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
			showAlert = false; // FIXME: this does not rerender the page. it should though
		}}
	/>
{/if}

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
				class={missing_values[i] ? 'bg-primary-600 text-white dark:bg-primary-600' : ''}
				bind:value={element.value}
				{...element.props}
			/>
		{/each}

		<Label class="font-semibold text-gray-700 dark:text-gray-400">Anmerkungen</Label>
		<Textarea name={'remarks'} bind:value={remarks} placeholder="Bitte eintragen (optional)" />

		<Button
			class="w-full rounded-lg bg-primary-700 px-4 py-2 font-semibold text-white hover:bg-primary-800"
			on:click={onSubmit}
			href={!showAlert ? undefined : '/childrengallery'}
			>Hinzufügen
		</Button>
	</form>
</Card>
