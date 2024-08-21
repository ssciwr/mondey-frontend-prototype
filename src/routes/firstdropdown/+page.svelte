<script>
	import AbstractContent from '$lib/components/AbstractContent.svelte';
	import AbstractDropdown from '$lib/components/AbstractDropdown.svelte';

	const letteroptions = ['a', 'b', 'c', 'd'];
	const defaultOptions = ['gar nicht', 'ansatzweise', 'weitgehend', 'zuverlässig'];

	const data_to_display = [
		{
			name: 'standing up',
			items: letteroptions,
			about:
				'How well can the child stand up from sitting or crawling around and how readily is it able to do so',
			selected: false
		},
		{
			name: 'gripping a pen the right way',
			items: defaultOptions,
			about: 'How well can the child hold a pen or pencil and how coordinated can it use it',
			selected: false
		},
		{
			name: 'talking in full sentences',
			items: letteroptions,
			about: 'How well articulated is the child in its speech and how well can it express itself',
			selected: false
		}
	];

	const heading = 'some initial dummy dropdown page';
</script>

<AbstractContent showBottomNavbar={true} lastPage="/" nextPage="/nextdropdown" infoPage="/info">
	<AbstractDropdown data={data_to_display} {heading} />
</AbstractContent>
