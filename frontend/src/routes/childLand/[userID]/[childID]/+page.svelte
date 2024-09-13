<script lang="ts">
	import TableDisplay from '$lib/components/DataDisplay/TableDisplay.svelte';

	// this will be passed from the backend eventually
	export let data_to_display = $$props.data.observationData.summary;

	// process data to add links: This could be done in the backend or stored accordingly
	// this should not live in the data_to_display datastructure that will be obtained from the backend
	const links = data_to_display.map((element) => {
		let link = {};
		for (let date of Object.keys(element).filter((e) => e != 'name')) {
			link[date] = '/surveyfeedback'; // FIXME: this is missing a date element: it should go /dataAcquisition/*date*/element.name
		}
		return link;
	});

	const headerlinks = data_to_display.map((element) => {
		console.log(element['date']);
		return { [element['date']]: '/surveyfeedback' };
	});

	const statusIndicator = {
		good: 'bg-green-500',
		bad: 'bg-red-600',
		warn: 'bg-yellow-300'
	};
	const searchableColumns = Object.keys(data_to_display[0]).filter((key) => key !== 'name');

	const caption =
		'Here you see an overview of all completed and outstanding milestones for the current inventory.';

	const statusColumns = Object.keys(data_to_display[0]).filter((key) => key !== 'name');
</script>

<TableDisplay
	{caption}
	data={data_to_display}
	{links}
	{headerlinks}
	{statusIndicator}
	{searchableColumns}
	{statusColumns}
/>
