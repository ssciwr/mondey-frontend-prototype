<script>
	import { base } from '$app/paths';
	import AbstractContent from '$lib/components/AbstractContent.svelte';
	import TableDisplay from '$lib/components/DataDisplay/TableDisplay.svelte';

	const data_to_display = [
		{ name: 'milestoneA', status: 'done' },
		{ name: 'milestoneB', status: 'open' },
		{ name: 'milestoneC', status: 'open' },
		{ name: 'milestoneD', status: 'incomplete' },
		{ name: 'milestoneE', status: 'done' }
	];

	const statusIndicator = {
		done: 'bg-green-500',
		open: 'bg-red-600',
		incomplete: 'bg-yellow-300'
	};

	const caption =
		'This is an overview over which milestones for the current survey have been completed';
</script>

<AbstractContent
	showBottomNavbar={true}
	lastpage="{base}/dataAcquisition/surveyC"
	nextpage="{base}"
	infopage="{base}/info"
>
	<TableDisplay
		data={data_to_display}
		{statusIndicator}
		{caption}
		statusColumns="{['status']},"
		searchableColumns={['name']}
	/>
</AbstractContent>
