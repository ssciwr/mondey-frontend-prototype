<script>
	import AbstractDropdownItem from '$lib/components/DataInput/AbstractDropdownItem.svelte';
	import AbstractRegistrationForm from '$lib/components/DataInput/AbstractRegistrationForm.svelte';
	import { Input, Textarea } from 'flowbite-svelte';
	const data = [
		{
			itemComponent: Input,
			componentProps: {
				type: 'text',
				name: 'name',
				placeholder: 'Name',
				// label: 'Name',
				value: 'Tom',
				required: true
			}
		},
		{
			itemComponent: Input,
			componentProps: {
				type: 'date',
				name: 'dateofbirth',
				placeholder: 'Geburtsdatum',
				// label: 'Geburtsdatum',
				value: '2021-05-22',
				required: true
			}
		},
		{
			itemComponent: AbstractDropdownItem,
			componentProps: {
				name: 'Frühgeburt?',
				items: ['Ja', 'Nein'],
				// label: 'Frühgeburt',
				value: 'Nein',
				required: true
			}
		},
		{
			itemComponent: AbstractDropdownItem,
			componentProps: {
				name: 'Geschlecht',
				items: ['Männlich', 'Weiblich'],
				// label: 'Geschlecht',
				value: 'Weiblich',
				required: true
			}
		},
		{
			itemComponent: AbstractDropdownItem,
			componentProps: {
				name: 'Nationalität',
				items: ['De', 'US', 'Fr', 'IT', 'Es'],
				// label: 'Geschlecht',
				value: 'De',
				required: true
			}
		},
		{
			itemComponent: AbstractDropdownItem,
			componentProps: {
				name: 'Muttersprache',
				items: ['Deutsch', 'Englisch (UK)', 'Englisch (Us)', 'Mandarin', 'Arabisch'],
				// label: 'Geschlecht',
				value: 'Englisch (UK)',
				required: true
			}
		},
		{
			itemComponent: AbstractDropdownItem,
			componentProps: {
				name: 'Verhältnis des Kindes zu ihnen',
				items: [
					'Kind',
					'Enkelkind',
					'Neffe/Nichte',
					'Pflegekind',
					'Adoptivkind',
					'Betreuung extern',
					'Betreuung zu Hause'
				],
				value: 'Betreuung extern',
				required: true
			}
		},
		{
			itemComponent: AbstractDropdownItem,
			componentProps: {
				name: 'Entwicklungsauffälligkeiten',
				items: ['Hörprobleme', 'Fehlsichtigkeit', 'Sprachfehler'],
				value: 'Hörprobleme',
				required: true
			}
		},
		{
			itemComponent: Textarea,
			componentProps: {
				name: 'Anmerkungen',
				label: 'Anmerkungen',
				placeholder: 'Anmerkungen',
				rows: 5,
				value: 'this that and the other',
				required: true
			}
		}
	];
	const heading = 'Daten des Kindes überprüfen';

	const buttons = [
		{
			label: 'Fertig',
			href: '/'
		}
	];
</script>

<div class="m-1 w-full max-w-md items-center justify-center">
	<AbstractRegistrationForm {heading} props={data} {buttons} />
</div>
