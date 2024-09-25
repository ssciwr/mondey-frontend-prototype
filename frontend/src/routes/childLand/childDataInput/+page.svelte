<script>
	import ChildrenRegistration from '$lib/components/ChildrenRegistration.svelte';
	import Fileupload from '$lib/components/DataInput/Fileupload.svelte';
	import RadioList from '$lib/components/DataInput/RadioList.svelte';

	import { Input, MultiSelect, Select, Textarea } from 'flowbite-svelte';

	const data = [
		{
			component: Input,
			value: null,
			props: {
				type: 'text',

				label: 'Name',
				placeholder: 'Bitte eintragen',
				key: 'name',
				required: true
			}
		},
		{
			component: Input,
			value: null,
			props: {
				type: 'date',

				label: 'Geburtsdatum',
				placeholder: 'Bitte eintragen',
				key: 'dateOfBirth',
				required: true
			}
		},
		{
			component: RadioList,
			value: null,
			additionalValue: null,
			props: {
				label: 'Frühgeburt',
				items: ['nein', '0-2 Monate', '2-4 Monate', '4-6 Monate', 'Anderes'].map((v) => {
					return { label: String(v), value: v };
				}),
				placeholder: 'Bitte auswählen',
				key: 'bornEarly',
				required: true,
				unique: true,
				textTrigger: 'Anderes',
				selected: [false, false, false, false]
			}
		},
		{
			component: RadioList,
			value: null,
			additionalValue: null,
			props: {
				label: 'Geschlecht',
				items: ['männlich', 'weiblich'].map((v) => {
					return { label: String(v), value: v };
				}),
				placeholder: 'Bitte auswählen',
				key: 'gender',
				required: true,
				unique: true,
				selected: [false, false]
			}
		},
		{
			component: MultiSelect,
			value: [],
			additionalValue: null,
			props: {
				label: 'Nationalität',
				items: ['Andere', 'Deutschland', 'Grossbritannien', 'USA', 'China'].map((v) => {
					return { name: String(v), value: v };
				}),
				placeholder: 'Bitte auswählen',
				key: 'nationality',
				required: true,
				textTrigger: 'Andere'
			}
		},
		{
			component: MultiSelect,
			value: [],
			additionalValue: null,
			props: {
				label: 'Sprache',
				items: ['Andere', 'Deutsch', 'Englisch (UK)', 'Englisch (Us)', 'Mandarin', 'Arabisch'].map(
					(v) => {
						return { name: String(v), value: v };
					}
				),
				placeholder: 'Bitte auswählen',
				key: 'language',
				required: true,
				textTrigger: 'Andere'
			}
		},
		{
			component: Select,
			value: null,
			additionalValue: null,
			props: {
				label: 'Verhältnis zum Kind',
				key: 'relationship',
				items: [
					'Anderes',
					'Kind',
					'Enkelkind',
					'Neffe/Nichte',
					'Pflegekind',
					'Adoptivkind',
					'Betreuung extern',
					'Betreuung zu Hause'
				].map((v) => {
					return { name: String(v), value: v };
				}),
				placeholder: 'Bitte auswählen',
				required: true,
				textTrigger: 'Anderes'
			}
		},
		{
			component: MultiSelect,
			value: [],
			additionalValue: null,
			props: {
				label: 'Entwicklungsauffälligkeiten',
				items: ['keine', 'Hörprobleme', 'Fehlsichtigkeit', 'Sprachfehler', 'Andere'].map((v) => {
					return { name: String(v), value: v };
				}),
				placeholder: 'Bitte auswählen',
				key: 'developmentalIssues',
				required: true,
				textTrigger: 'Andere'
			}
		},
		{
			component: Textarea,
			value: null,
			props: {
				label: 'Anmerkungen',
				placeholder: 'Weitere Bemerkungen',
				key: 'remarks',
				required: false
			}
		},
		{
			component: Fileupload,
			value: null,
			props: {
				label: 'Foto',
				placeholder: 'Bitte wählen sie ein Bild aus falls gewünscht',
				key: 'image',
				required: false,
				accept: ['png', 'jpg', 'svg', 'webp']
			}
		}
	];
</script>

<ChildrenRegistration {data} />
