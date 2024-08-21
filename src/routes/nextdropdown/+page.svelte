<script>
	import AbstractContent from '$lib/components/AbstractContent.svelte';
	import AbstractDropdown from '$lib/components/AbstractDropdown.svelte';
	import { DropdownDataElement } from '$lib/js/dropdowndata.js';

	const defaultOptions = ['gar nicht', 'ansatzweise', 'weitgehend', 'zuverlässig'];

	const dropdownData = [
		new DropdownDataElement(
			'standing up',
			defaultOptions,
			'How well can the child stand up from sitting or crawling around and how readily is it able to do so'
		),
		new DropdownDataElement(
			'making a mess',
			defaultOptions,
			'This describes how efficiently the child can distribute toys in every single corner of every single room in the house'
		),
		new DropdownDataElement(
			'gripping a pen the right way',
			defaultOptions,
			'How well can the child hold a pen or pencil and how coordinated can it use it'
		),
		new DropdownDataElement(
			'talking in full sentences',
			defaultOptions,
			'How well articulated is the child in its speech and how well can it express itself'
		)
	];

	const heading = 'the second dummy dropdown page';
</script>

<AbstractContent showBottomNavbar={true} lastPage="/firstdropdown" nextPage="/" infoPage="/info">
	<AbstractDropdown {dropdownData} {heading} />
</AbstractContent>
