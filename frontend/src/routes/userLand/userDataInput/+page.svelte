<script lang="ts">
	import CheckboxList from '$lib/components/DataInput/CheckboxList.svelte';
	import UserDataInput from '$lib/components/UserDataInput.svelte';
	import { Input, Select } from 'flowbite-svelte';

	// this stuff here will become backend calls in the end because that is where the data this page will be filled with
	// will come from. Hence, they are not put into a separate library or anything
	function intervalRange(size: number, startAt: number = 0, step: number = 1, asItems = false) {
		let values = [...Array(size).keys()].map(
			(i) => String(i * step + startAt) + '-' + String((i + 1) * step + startAt)
		);

		if (asItems) {
			return values.map((v) => {
				return { name: String(v), value: v };
			});
		} else {
			return values;
		}
	}

	function numericalRange(size: number, startAt: number = 0, step: number = 1, asItems = false) {
		let values = [...Array(size).keys()].map((i) => i * step + startAt);

		if (asItems) {
			return values.map((v) => {
				return { name: String(v), value: v };
			});
		} else {
			return values;
		}
	}
	const data = [
		{
			component: Select,
			value: null,
			additionalValue: null,
			props: {
				name: 'Geburtsjahr',
				items: numericalRange(60, 1960, 1, true),
				placeholder: 'Bitte auswählen',
				label: 'Geburtsjahr',
				required: true
			}
		},
		{
			component: CheckboxList,
			value: null,
			additionalValue: null,
			props: {
				name: 'Geschlecht',
				items: ['männlich', 'weiblich', 'divers', 'Anderes'].map((v) => {
					return { label: String(v), value: v };
				}),
				placeholder: 'Bitte auswählen',
				label: 'Geschlecht',
				required: true,
				textTrigger: 'Anderes',
				unique: true,
				selected: [false, false, false, false]
			}
		},
		{
			component: Select,
			value: null,
			additionalValue: null,
			props: {
				name: 'Höchster Bildungsabschluss',
				items: [
					'kein Schulabschluss',
					'Hauptschulabschluss',
					'Realschulabschluss',
					'Abitur',
					'Bachelor',
					'Master',
					'Promotion',
					'Anderer'
				].map((v) => {
					return { name: String(v), value: v };
				}),
				placeholder: 'Bitte auswählen',
				required: true,
				label: 'Höchster Bildungsabschluss',
				textTrigger: 'Anderer'
			}
		},
		{
			component: Select,
			value: null,
			additionalValue: null,
			props: {
				name: 'Arbeitszeit/Woche',
				items: intervalRange(13, 0, 5, true),
				placeholder: 'Bitte auswählen',
				label: 'Arbeitszeit/Woche',
				required: true,
				textTrigger: 'Andere'
			}
		},
		{
			component: Select,
			value: null,
			additionalValue: null,
			props: {
				name: 'Familieneinkommen/Jahr',
				items: intervalRange(23, 0, 5000, true),
				placeholder: 'Bitte auswählen',
				label: 'Familieneinkommen/Jahr',
				required: true,
				textTrigger: 'Anderes'
			}
		},
		{
			component: Input,
			value: null,
			additionalValue: null,
			props: {
				name: 'Beruf',
				type: 'text',
				placeholder: 'Geben sie ihren Beruf an',
				label: 'Beruf',
				required: true
			}
		}
	];
</script>

<UserDataInput {data} />
