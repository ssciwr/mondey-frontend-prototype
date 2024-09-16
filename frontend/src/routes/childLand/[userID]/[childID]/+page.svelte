<script lang="ts">
	import { base } from '$app/paths';
	import TableDisplay from '$lib/components/DataDisplay/TableDisplay.svelte';
	import { children } from '$lib/stores/childrenStore';
	import { onMount } from 'svelte';

	// this will be passed from the backend eventually
	export let data_to_display = $$props.data.observationData.summary;
	// process data to add links: This could be done in the backend or stored accordingly
	// this should not live in the data_to_display datastructure that will be obtained from the backend
	const celllinks = data_to_display.map((element) => {
		return Object.keys(element).map((k) => {
			if (k === 'name') {
				return null;
			} else {
				return `${base}/milestone`; // TODO: this would lead to a page where the actual data is loaded for the survey
			}
		});
	});

	const headerlinks = Object.keys(data_to_display[0]).map((k) => {
		if (k === 'name') {
			return null;
		} else {
			return `${base}/surveyfeedback`; // TODO: this would lead to a page where the actual data is loaded for the survey
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

	onMount(() => {
		children.load();
	});
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
