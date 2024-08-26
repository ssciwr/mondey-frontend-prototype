<script>
	import AbstractContent from '$lib/components/AbstractContent.svelte';
	import AbstractDataInput from '$lib/components/DataInput/AbstractDataInput.svelte';
	import AbstractDropdownItem from '$lib/components/DataInput/AbstractDropdownItem.svelte';
	import { Input } from 'flowbite-svelte';

	function range(size, startAt = 0, step = 1) {
		return [...Array(size).keys()].map((i) => i * step + startAt);
	}

	export let role = 'Benutzer/in';

	const heading = 'Benutzerdaten eingeben';
	const description =
		'Bitte vervollständigen sie ihre Daten um die Registrierung abzuschließen. Wählen sie dazu das jeweils zutreffende aus der jeweiligen Liste aus';
	const props = [
		{
			itemComponent: AbstractDropdownItem,
			componentProps: {
				name: 'Geburtsjahr',
				items: range(100, 1920),
				about: 'Wählen sie ihr Geburtsjahr aus',
				selected: 1988
			}
		},
		{
			itemComponent: AbstractDropdownItem,
			componentProps: {
				name: 'Geschlecht',
				items: ['männlich', 'weiblich', 'divers'],
				about: 'Wählen sie ihr Geschlecht aus',
				selected: 'weiblich'
			}
		},
		{
			itemComponent: AbstractDropdownItem,
			componentProps: {
				name: 'Höchster Bildungsabschluss',
				items: [
					'kein Schulabschluss',
					'Hauptschulabschluss',
					'Realschulabschluss',
					'Abitur',
					'Bachelor',
					'Master',
					'Promotion'
				],
				about: 'Wählen sie ihren höchsten Bildungsabschluss aus',
				selected: 'Realschulabschluss'
			}
		},

		{
			itemComponent: AbstractDropdownItem,
			componentProps: {
				name: 'Arbeitszeit/Woche',
				items: range(13, 0, 5),
				about:
					'Wählen sie ihre Arbeitszeit pro Woche aus. Wählen sie die Zahl, die dem tatsächlichen Wert am nächsten kommt.',
				selected: 40
			}
		},
		{
			itemComponent: AbstractDropdownItem,
			componentProps: {
				name: 'Familieneinkommen/Jahr',
				items: range(23, 0, 5000),
				about:
					'Wählen sie ihre Jahreseinkommen aus. Wählen sie die Zahl, die dem tatsächlichen Wert am nächsten kommt.',
				selected: 50000
			}
		},

		{
			itemComponent: Input,
			componentProps: {
				name: 'Beruf',
				type: 'text',
				about: 'Geben sie ihren Beruf an',
				placeholder: 'Geben sie ihren Beruf an'
			}
		}
	];

	if (role == 'Forscher/in') {
		props.push({
			itemComponent: AbstractDropdownItem,
			componentProps: {
				name: 'Forschungsbereich',
				items: ['Bereich 1', 'Bereich 2', 'Bereich 3'],
				about: 'Wählen sie ihren Forschungsbereich aus',
				selected: 'Bereich 1'
			}
		});
	}
</script>

<div class="m-1 w-full max-w-md items-center justify-center">
	<AbstractContent infopage={'/info'} nextpage={'/registerUser/userDataInput'}>
		<AbstractDataInput {props} {heading} {description} />
	</AbstractContent>
</div>
