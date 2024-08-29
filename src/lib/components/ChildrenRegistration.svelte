<script lang="ts">
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
	let remarks: String;

	function onSubmit() {
		let data = {
			name,
			date_of_birth,
			bornEarly,
			gender,
			nationality,
			first_language,
			problems,
			relationship
		};
		if (Object.values(data).every((val) => val !== undefined)) {
			console.log('everything defined: ', data);
			data['remarks' as String] = remarks;
			return data;
		} else {
		}
	}
</script>

<Card class="container m-1 mx-auto w-full max-w-md items-center justify-center pb-6">
	{#if heading}
		<Heading
			tag="h3"
			class="m-1 mb-3 p-1 text-center font-bold tracking-tight text-gray-700 dark:text-gray-400"
			>{heading}</Heading
		>
	{/if}

	<div class="space-y-6rtl:space-x-reverse items-center justify-center space-x-4">
		<form class="flex flex-col space-y-6">
			<Label class=" font-semibold text-gray-700 dark:text-gray-400">Name</Label>
			<Input
				type="text"
				name="name"
				required={true}
				placeholder="Bitte eingeben"
				bind:value={name}
			/>

			<Label class=" font-semibold text-gray-700 dark:text-gray-400">Geburtsdatum</Label>
			<Input type="date" name="birthday" required={true} bind:value={date_of_birth} />

			<Label class=" font-semibold text-gray-700 dark:text-gray-400">Frühgeburt</Label>
			<Select
				name={'born_early'}
				placeholder={'Bitte auswählen'}
				items={[
					{ name: 'Ja', value: 'Ja' },
					{ name: 'Nein', value: 'Nein' }
				]}
				bind:value={bornEarly}
			/>

			<Label class=" font-semibold text-gray-700 dark:text-gray-400">Geschlecht</Label>
			<Select
				name={'gender'}
				placeholder={'Bitte auswählen'}
				items={[
					{ name: 'männlich', value: 'männlich' },
					{ name: 'weiblich', value: 'weiblich' }
				]}
				bind:value={gender}
			/>

			<Label class=" font-semibold text-gray-700 dark:text-gray-400">Nationalität</Label>
			<Select
				name={'nationality'}
				placeholder={'Bitte auswählen'}
				items={['Deutschland', 'Grossbritannien', 'USA', 'China'].map((item) => ({
					name: item,
					value: item
				}))}
				bind:value={nationality}
			/>

			<Label class=" font-semibold text-gray-700 dark:text-gray-400">Sprache</Label>
			<Select
				name={'first_language'}
				placeholder={'Bitte auswählen'}
				items={['Deutsch', 'Englisch (UK)', 'Englisch (Us)', 'Mandarin', 'Arabisch'].map(
					(item) => ({ name: item, value: item })
				)}
				bind:value={first_language}
			/>

			<Label class=" font-semibold text-gray-700 dark:text-gray-400">Verhältnis zum Kind</Label>
			<Select
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
			/>

			<Label class=" font-semibold text-gray-700 dark:text-gray-400"
				>Entwicklungsauffälligkeiten</Label
			>
			<Select
				name={'developmental_problems'}
				placeholder={'Bitte auswählen'}
				items={['Hörprobleme', 'Fehlsichtigkeit', 'Sprachfehler'].map((item) => ({
					name: item,
					value: item
				}))}
				bind:value={problems}
			/>

			<Label class="font-semibold text-gray-700 dark:text-gray-400">Anmerkungen</Label>
			<Textarea name={'remarks'} bind:value={remarks} placeholder="Bitte eintragen" />

			<Button
				class="w-full rounded-lg bg-primary-700 px-4 py-2 font-semibold text-white hover:bg-primary-800"
				on:click={onSubmit}
				>Weiter
			</Button>
		</form>
	</div>
</Card>
