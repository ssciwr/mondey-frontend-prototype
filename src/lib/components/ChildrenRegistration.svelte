<script>
	import AbstractDataInput from '$lib/components/DataInput/AbstractDataInput.svelte';
	import AbstractDropdownItem from '$lib/components/DataInput/AbstractDropdownItem.svelte';
	import { Card, Heading, Input, Textarea } from 'flowbite-svelte';
	$: data = [
		{
			itemComponent: Input,
			componentProps: {
				type: 'text',
				name: 'name',
				label: 'Name',
				value: '',
				required: true
			}
		},
		{
			itemComponent: Input,
			componentProps: {
				type: 'date',
				name: 'dateofbirth',
				label: 'Geburtsdatum',
				value: '',
				required: true
			}
		},
		{
			itemComponent: AbstractDropdownItem,
			componentProps: {
				name: 'Bitte auswählen',
				items: ['Ja', 'Nein'],
				label: 'Frühgeburt',
				value: '',
				required: true
			}
		},
		{
			itemComponent: AbstractDropdownItem,
			componentProps: {
				name: 'Bitte auswählen',
				items: ['Männlich', 'Weiblich'],
				label: 'Geschlecht',
				value: '',
				required: true
			}
		},
		{
			itemComponent: AbstractDropdownItem,
			componentProps: {
				name: 'Bitte auswählen',
				items: ['De', 'US', 'Fr', 'IT', 'Es'],
				label: 'Nationalität',
				value: '',
				required: true
			}
		},
		{
			itemComponent: AbstractDropdownItem,
			componentProps: {
				name: 'Bitte auswählen',
				items: ['Deutsch', 'Englisch (UK)', 'Englisch (Us)', 'Mandarin', 'Arabisch'],
				label: 'Bitte geben sie die erste Sprache an die das Kind gelernt hat',
				value: '',
				required: true
			}
		},
		{
			itemComponent: AbstractDropdownItem,
			componentProps: {
				name: 'Bitte auswählen',
				items: [
					'Kind',
					'Enkelkind',
					'Neffe/Nichte',
					'Pflegekind',
					'Adoptivkind',
					'Betreuung extern',
					'Betreuung zu Hause'
				],
				value: '',
				label: 'Verhältnis des Kindes zu ihnen',
				required: true
			}
		},
		{
			itemComponent: AbstractDropdownItem,
			componentProps: {
				name: 'Bitte auswählen',
				items: ['Hörprobleme', 'Fehlsichtigkeit', 'Sprachfehler'],
				value: '',
				label: 'Entwicklungsauffälligkeiten',
				required: true
			}
		},
		{
			itemComponent: Textarea,
			componentProps: {
				name: 'Bitte eintragen',
				label: 'Sonstige Anmerkungen',
				rows: 5,
				value: '',
				required: true
			}
		}
	];

	const heading = 'Neues Kind registrieren';

	const buttons = [
		{
			label: 'Weiter',
			href: '/'
		}
	];
</script>

<div class="container m-1 mx-auto w-full max-w-md items-center justify-center pb-6">
	<Card>
		{#if heading}
			<Heading
				tag="h3"
				class="m-1 mb-3 p-1 text-center font-bold tracking-tight text-gray-700 dark:text-gray-400"
				>{heading}</Heading
			>
		{/if}
		<AbstractDataInput props={data} {buttons} />
	</Card>
</div>
