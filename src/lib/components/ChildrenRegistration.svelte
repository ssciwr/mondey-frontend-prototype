<script lang="ts">
	import AlertMessage from '$lib/components/AlertMessage.svelte';
	import { Button, Card, Heading, Input, Label, Select, Textarea } from 'flowbite-svelte';
	const heading = 'Neues Kind registrieren';

	let name: String;
	let date_of_birth: Date;
	let bornEarly: Boolean;
	let gender: String;
	let nationality: String;
	let first_language: String;
	let problems: String;
	let relationship: String;
	let remarks: String = '';

	// rerender page if missing values or showAlert changes
	$: missing_values = [];
	$: showAlert = false;

	// input data submission
	interface SubmittedData {
		name: String;
		date_of_birth: Date;
		bornEarly: Boolean;
		gender: String;
		nationality: String;
		first_language: String;
		problems: String;
		relationship: String;
		remarks?: String;
	}

	function onSubmit() {
		const data: SubmittedData = {
			name,
			date_of_birth,
			bornEarly,
			gender,
			nationality,
			first_language,
			problems,
			relationship,
			remarks
		};

		if (Object.values(data).every((val) => val !== undefined)) {
			missing_values = [];
			return data;
		} else {
			showAlert = true;
			(missing_values as Boolean[]) = Object.keys(data)
				.map((key) => (data[key as keyof SubmittedData] ? false : true))
				.filter((v) => v === true);
		}
	}
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

<Card class="container m-1 mx-auto w-full max-w-xl">
	{#if heading}
		<Heading
			tag="h3"
			class="m-1 mb-3 p-1 text-center font-bold tracking-tight text-gray-700 dark:text-gray-400"
			>{heading}</Heading
		>
	{/if}

	<form class="m-1 mx-auto w-full flex-col space-y-6">
		<Label class="font-semibold text-gray-700 dark:text-gray-400">Name</Label>
		<Input
			class={missing_values[0] ? 'bg-primary-600 text-white dark:bg-primary-600' : ''}
			type="text"
			name="name"
			placeholder="Bitte eingeben"
			bind:value={name}
			required
		/>

		<Label class=" font-semibold text-gray-700 dark:text-gray-400">Geburtsdatum</Label>
		<Input
			class={missing_values[1] ? 'bg-primary-600 text-white dark:bg-primary-600' : ''}
			type="date"
			name="birthday"
			bind:value={date_of_birth}
			required
		/>

		<Label class=" font-semibold text-gray-700 dark:text-gray-400">Frühgeburt</Label>
		<Select
			name={'born_early'}
			class={missing_values[2] ? 'bg-primary-600 text-white dark:bg-primary-600' : ''}
			placeholder={'Bitte auswählen'}
			items={[
				{ name: 'Ja', value: 'Ja' },
				{ name: 'Nein', value: 'Nein' }
			]}
			bind:value={bornEarly}
			required
		/>

		<Label class=" font-semibold text-gray-700 dark:text-gray-400">Geschlecht</Label>
		<Select
			class={missing_values[3] ? 'bg-primary-600 text-white dark:bg-primary-600' : ''}
			name={'gender'}
			placeholder={'Bitte auswählen'}
			items={[
				{ name: 'männlich', value: 'männlich' },
				{ name: 'weiblich', value: 'weiblich' }
			]}
			bind:value={gender}
			required
		/>

		<Label class=" font-semibold text-gray-700 dark:text-gray-400">Nationalität</Label>
		<Select
			class={missing_values[4] ? 'bg-primary-600 text-white dark:bg-primary-600' : ''}
			name={'nationality'}
			placeholder={'Bitte auswählen'}
			items={['Deutschland', 'Grossbritannien', 'USA', 'China'].map((item) => ({
				name: item,
				value: item
			}))}
			bind:value={nationality}
			required
		/>

		<Label class=" font-semibold text-gray-700 dark:text-gray-400">Sprache</Label>
		<Select
			class={missing_values[5] ? 'bg-primary-600 text-white dark:bg-primary-600' : ''}
			name={'first_language'}
			placeholder={'Bitte auswählen'}
			items={['Deutsch', 'Englisch (UK)', 'Englisch (Us)', 'Mandarin', 'Arabisch'].map((item) => ({
				name: item,
				value: item
			}))}
			bind:value={first_language}
			required
		/>

		<Label class=" font-semibold text-gray-700 dark:text-gray-400">Verhältnis zum Kind</Label>
		<Select
			class={missing_values[6] ? 'bg-primary-600 text-white dark:bg-primary-600' : ''}
			name={'Verhältnis zum Kind'}
			placeholder={'Bitte auswählen'}
			items={[
				'Kind',
				'Enkelkind',
				'Neffe/Nichte',
				'Pflegekind',
				'Adoptivkind',
				'Betreuung extern',
				'Betreuung zu Hause'
			].map((item) => ({ name: item, value: item }))}
			bind:value={relationship}
			required
		/>

		<Label class=" font-semibold text-gray-700 dark:text-gray-400"
			>Entwicklungsauffälligkeiten</Label
		>
		<Select
			class={missing_values[7] ? 'bg-primary-600 text-white dark:bg-primary-600' : ''}
			name={'developmental_problems'}
			placeholder={'Bitte auswählen'}
			items={['Hörprobleme', 'Fehlsichtigkeit', 'Sprachfehler'].map((item) => ({
				name: item,
				value: item
			}))}
			required
			bind:value={problems}
		/>

		<Label class="font-semibold text-gray-700 dark:text-gray-400">Anmerkungen</Label>
		<Textarea name={'remarks'} bind:value={remarks} placeholder="Bitte eintragen (optional)" />

		<Button
			class="w-full rounded-lg bg-primary-700 px-4 py-2 font-semibold text-white hover:bg-primary-800"
			on:click={onSubmit}
			>Hinzufügen
		</Button>
	</form>
</Card>
