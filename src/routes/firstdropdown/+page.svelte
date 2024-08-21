<script>
	import AbstractContent from '$lib/components/AbstractContent.svelte';
	import AbstractDropdown from '$lib/components/AbstractDropdown.svelte';
	import { DropdownDataElement } from '$lib/js/dropdowndata.js';

	const letteroptions = ['a', 'b', 'c', 'd'];
	const defaultOptions = ['gar nicht', 'ansatzweise', 'weitgehend', 'zuverlässig'];

	const dropdownData = [
		new DropdownDataElement(
			'standing up',
			letteroptions,
			'How well can the child stand up from sitting or crawling around and how readily is it able to do so'
		),
		new DropdownDataElement(
			'gripping a pen the right way',
			defaultOptions,
			'How well can the child hold a pen or pencil and how coordinated can it use it'
		),
		new DropdownDataElement(
			'talking in full sentences',
			letteroptions,
			'How well articulated is the child in its speech and how well can it express itself'
		)
	];

	const heading = 'some initial dummy dropdown page';
</script>

<AbstractContent showBottomNavbar={true} lastPage="/" nextPage="/nextdropdown" infoPage="/info">
	<AbstractDropdown {dropdownData} {heading} />
</AbstractContent>
