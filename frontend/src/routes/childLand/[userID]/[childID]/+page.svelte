<script>
	import { base } from '$app/paths';
	import AbstractContent from '$lib/components/AbstractContent.svelte';
	import TableDisplay from '$lib/components/DataDisplay/TableDisplay.svelte';

	// this will be passed from the backend eventually
	export let data_to_display = $$props.data.observationData.summary;

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

<AbstractContent lastpage="/childrengallery" nextpage={`${base}/milestone`} infopage="{base}/info">
	<TableDisplay
		{caption}
		data={data_to_display}
		{statusIndicator}
		{searchableColumns}
		{statusColumns}
	/>
</AbstractContent>
