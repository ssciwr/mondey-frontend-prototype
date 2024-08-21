<script>
	import AbstractContent from '$lib/components/AbstractContent.svelte';
	import TableDisplay from '$lib/components/DataDisplay/TableDisplay.svelte';

	export let data_to_display = [
		{ id: 1, name: 'testA', time: 2017, status: 'good' },
		{ id: 2, name: 'testB', time: 2016, status: 'bad' },
		{ id: 3, name: 'testC', time: 2012, status: 'bad' },
		{ id: 4, name: 'testD', time: 2020, status: 'warn' },
		{ id: 5, name: 'testE', time: 2019, status: 'good' }
	];

	export let statusIndicator = {
		good: 'bg-green-500',
		bad: 'bg-red-500',
		warn: 'bg-yellow-500'
	};
</script>

<AbstractContent showBottomNavbar={true} lastpage="/nextdropdown" nextpage="/" infopage="/info">
	<TableDisplay data={data_to_display} {statusIndicator} />
</AbstractContent>
