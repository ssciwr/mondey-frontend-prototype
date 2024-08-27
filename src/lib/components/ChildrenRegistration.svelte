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
				value: '',
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
				value: '',
				required: true
			}
		},
		{
			itemComponent: AbstractDropdownItem,
			componentProps: {
				name: 'Frühgeburt?',
				items: ['Ja', 'Nein'],
				// label: 'Frühgeburt',
				value: '',
				required: true
			}
		},
		{
			itemComponent: AbstractDropdownItem,
			componentProps: {
				name: 'Geschlecht',
				items: ['Männlich', 'Weiblich'],
				// label: 'Geschlecht',
				value: '',
				required: true
			}
		},
		{
			itemComponent: AbstractDropdownItem,
			componentProps: {
				name: 'Nationalität',
				items: ['De', 'US', 'Fr', 'IT', 'Es'],
				// label: 'Geschlecht',
				value: '',
				required: true
			}
		},
		{
			itemComponent: AbstractDropdownItem,
			componentProps: {
				name: 'Muttersprache',
				items: ['Deutsch', 'Englisch (UK)', 'Englisch (Us)', 'Mandarin', 'Arabisch'],
				// label: 'Geschlecht',
				value: '',
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
				value: '',
				required: true
			}
		},
		{
			itemComponent: AbstractDropdownItem,
			componentProps: {
				name: 'Entwicklungsauffälligkeiten',
				items: ['Hörprobleme', 'Fehlsichtigkeit', 'Sprachfehler'],
				value: '',
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

<div class="container m-1 mx-auto w-full max-w-md">
	<AbstractRegistrationForm {heading} props={data} {buttons} />
</div>
