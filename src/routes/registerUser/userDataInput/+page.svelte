<script>
	import AbstractContent from '$lib/components/AbstractContent.svelte';
	import AbstractDropdownItem from '$lib/components/DataInput/AbstractDropdownItem.svelte';
	import AbstractRegistrationForm from '$lib/components/DataInput/AbstractRegistrationForm.svelte';
	import { Input } from 'flowbite-svelte';

	function intervalRange(size, startAt = 0, step = 1) {
		return [...Array(size).keys()].map(
			(i) => String(i * step + startAt) + '-' + String((i + 1) * step + startAt)
		);
	}

	function numericalRange(size, startAt = 0, step = 1) {
		return [...Array(size).keys()].map((i) => i * step + startAt);
	}

	export let role = 'Admin';

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

	$: if (role === 'Forscher/in') {
		props = user_props;
		props.push({
			itemComponent: AbstractDropdownItem,
			componentProps: {
				name: 'Forschungsbereich',
				items: ['Psychologie', 'Medizin', 'Physik'],
				about: 'Wählen sie ihren Forschungsbereich aus',
				selected: 'Psychologie'
			}
		});

		props.push({
			itemComponent: Input,
			componentProps: {
				name: 'Institution',
				type: 'text',
				about: 'Geben sie an an welcher Forschungsinstitution sie tätig sind',
				placeholder: 'Forschungsinstitution'
			}
		});
	}

	$: if (role == 'Admin') {
		props = user_props;
		props.push({
			itemComponent: Input,
			componentProps: {
				name: 'Institution',
				type: 'text',
				about: 'Geben sie ihr Admin Token ein',
				placeholder: 'Admin Token'
			}
		});
	}
</script>

<div class="m-1 w-full max-w-md items-center justify-center">
	<AbstractContent
		infopage={'/info'}
		lastpage={'/registerUser'}
		nextpage={'/registerUser/userDataValidation'}
	>
		<AbstractRegistrationForm {props} {heading} {description} />
	</AbstractContent>
</div>
