<script lang="ts">
	import TableDisplay from '$lib/components/DataDisplay/TableDisplay.svelte';

	// this will be passed from the backend eventually
	export let data_to_display = $$props.data.observationData.summary;
	// process data to add links: This could be done in the backend or stored accordingly
	// this should not live in the data_to_display datastructure that will be obtained from the backend
	const celllinks = data_to_display.map((element) => {
		let link = [];
		for (let date of Object.keys(element).filter((e) => e != 'name')) {
			link.push('/milestone'); // TODO: this currently only links to a dummy milestone page
		}
		return link;
	});

	const headerlinks = Object.keys(data_to_display[0]).map((k) => {
		if (k === 'name') {
			return null;
		} else {
			return '/surveyfeedback'; // TODO: this would lead to a page where the actual data is loaded for the survey
		}
	});

	const statusColumns = Object.keys(data_to_display[0]).filter((key) => key !== 'name');

	const statusIndicator = {
		good: 'bg-green-500',
		bad: 'bg-red-600',
		warn: 'bg-yellow-300'
	};

	const searchableColumns = Object.keys(data_to_display[0]).filter((key) => key !== 'name');

	const caption =
		'Here you see an overview of all completed and outstanding milestones for the current inventory.';
</script>

<TableDisplay
	{caption}
	data={data_to_display}
	{celllinks}
	{headerlinks}
	{statusIndicator}
	{searchableColumns}
	{statusColumns}
/>
