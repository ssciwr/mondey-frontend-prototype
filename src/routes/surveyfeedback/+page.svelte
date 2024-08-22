<script>
	import AbstractContent from '$lib/components/AbstractContent.svelte';
	import TableDisplay from '$lib/components/DataDisplay/TableDisplay.svelte';

	export let data_to_display = [
		{ name: 'surveyA', time: 2017, status: 'good' },
		{ name: 'surveyB', time: 2016, status: 'bad' },
		{ name: 'surveyC', time: 2012, status: 'bad' },
		{ name: 'surveyD', time: 2020, status: 'warn' },
		{ name: 'surveyE', time: 2019, status: 'good' }
	];

	export let statusIndicator = {
		good: 'bg-green-500',
		bad: 'bg-red-600',
		warn: 'bg-yellow-300'
	};
</script>

<AbstractContent
	showBottomNavbar={true}
	lastpage="/nextdropdown"
	nextpage="/trafficlightfeedback"
	infopage="/info"
>
	<TableDisplay data={data_to_display} {statusIndicator} />
</AbstractContent>
