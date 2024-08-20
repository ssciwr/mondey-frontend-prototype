<script>
	import AbstractContent from '$lib/components/AbstractContent.svelte';

	import Dropdown from '$lib/components/Dropdown.svelte';

	const defaultOptions = ['gar nicht', 'ansatzweise', 'weitgehend', 'zuverlässig'];

	const dropdownData = [
		{
			name: 'standing up',
			items: defaultOptions,
			tooltip:
				'How well can the child stand up from sitting or crawling around and how readily is it able to do so'
		},
		{
			name: 'making a mess',
			items: defaultOptions,
			tooltip:
				'This describes how efficiently the child can distribute toys in every single corner of every single room in the house'
		},
		{
			name: 'gripping a pen the right way',
			items: defaultOptions,
			tooltip: 'How well can the child hold a pen or pencil and how coordinated can it use it'
		}
	];

	const heading = 'some dummy dropdown page';
</script>

<AbstractContent showBottomNavbar={true}>
	<Dropdown />
</AbstractContent>
