<script>
	import AbstractContent from '$lib/components/AbstractContent.svelte';
	import AbstractDataInput from '$lib/components/DataInput/AbstractDataInput.svelte';
	import AbstractDropdownItem from '$lib/components/DataInput/AbstractDropdownItem.svelte';

	const defaultOptions = ['gar nicht', 'ansatzweise', 'weitgehend', 'zuverlässig'];
	const description = 'This is the second data selection page to test the dropdown component';
	const dropdownData = [
		{
			itemComponent: AbstractDropdownItem,
			label: 'standing up',
			componentProps: {
				name: 'standing up',
				items: defaultOptions,
				about:
					'How well can the child stand up from sitting or crawling around and how readily is it able to do so',
				selected: false
			}
		},
		{
			itemComponent: AbstractDropdownItem,
			label: 'making a mess',
			componentProps: {
				name: 'making a mess',
				items: defaultOptions,
				about:
					'This describes how efficiently the child can distribute toys in every single corner of every single room in the house',
				selected: false
			}
		},
		{
			itemComponent: AbstractDropdownItem,
			label: 'gripping a pen the right way',
			componentProps: {
				name: 'gripping a pen the right way',
				items: defaultOptions,
				about: 'How well can the child hold a pen or pencil and how coordinated can it use it',
				selected: false
			}
		},
		{
			itemComponent: AbstractDropdownItem,
			label: 'talking in full sentences',
			componentProps: {
				name: 'talking in full sentences',
				items: defaultOptions,
				about: 'How well articulated is the child in its speech and how well can it express itself',
				selected: false
			}
		}
	];

	const heading = 'the second data selection page';
</script>

<AbstractContent
	showBottomNavbar={true}
	lastpage={'/dataAcquisition/firstdropdown'}
	nextpage={'/surveyfeedback'}
	infopage="/info"
>
	<AbstractDataInput props={dropdownData} {heading} {description} />
</AbstractContent>
