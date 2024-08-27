<script>
	import AbstractDropdownItem from '$lib/components/DataInput/AbstractDropdownItem.svelte';
	import AbstractRegistrationForm from '$lib/components/DataInput/AbstractRegistrationForm.svelte';
	import { Input } from 'flowbite-svelte';

	// this stuff here will become backend calls in the end because that is where the data this page will be filled with
	// will come from. Hence, they are not put into a separate library or anything
	function intervalRange(size, startAt = 0, step = 1) {
		return [...Array(size).keys()].map(
			(i) => String(i * step + startAt) + '-' + String((i + 1) * step + startAt)
		);
	}

	function numericalRange(size, startAt = 0, step = 1) {
		return [...Array(size).keys()].map((i) => i * step + startAt);
	}

	const heading = 'Benutzerdaten eingeben';
	const description =
		'Bitte vervollständigen sie ihre Daten um die Registrierung abzuschließen. Wählen sie dazu das jeweils zutreffende aus der jeweiligen Liste aus';
	const user_props = [
		{
			itemComponent: AbstractDropdownItem,
			componentProps: {
				name: 'Geburtsjahr',
				items: numericalRange(100, 1920),
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
				items: intervalRange(13, 0, 5),
				about:
					'Wählen sie ihre Arbeitszeit pro Woche aus. Wählen sie die Zahl, die dem tatsächlichen Wert am nächsten kommt.',
				selected: '35-40'
			}
		},
		{
			itemComponent: AbstractDropdownItem,
			componentProps: {
				name: 'Familieneinkommen/Jahr',
				items: intervalRange(23, 0, 5000),
				about:
					'Wählen sie ihre Jahreseinkommen aus. Wählen sie die Zahl, die dem tatsächlichen Wert am nächsten kommt.',
				selected: '50000-55000'
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

	let props = user_props;

	const buttons = [
		{
			label: 'Weiter',
			href: '/'
		}
	];
</script>

<div class="container m-1 mx-auto w-full max-w-md">
	<AbstractRegistrationForm {props} {heading} {description} {buttons} />
</div>
