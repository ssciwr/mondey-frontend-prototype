<script>
	import TableDisplay from '$lib/components/DataDisplay/TableDisplay.svelte';

	const data_to_display = [
		{ name: 'milestoneA', status: 'done' },
		{ name: 'milestoneB', status: 'open' },
		{ name: 'milestoneC', status: 'open' },
		{ name: 'milestoneD', status: 'incomplete' },
		{ name: 'milestoneE', status: 'done' }
	];

	const celllinks = data_to_display.map((element) => {
		let link = [null, '/milestone']; // TODO: this should lead to the respective survey itself
		return link;
	});

	const statusIndicator = {
		done: 'bg-green-500',
		open: 'bg-red-600',
		incomplete: 'bg-yellow-300'
	};

	const caption =
		'This is an overview over which milestones for the current survey have been completed';

	console.log('celllinks in surveyfeedback', celllinks);
</script>

<TableDisplay
	data={data_to_display}
	{statusIndicator}
	{caption}
	{celllinks}
	statusColumns="{['status']},"
	searchableColumns={['status']}
/>
