<script>
	// @ts-nocheck

	import { TableBody, TableBodyRow, TableSearch } from 'flowbite-svelte';

	import TableCell from '$lib/components/DataDisplay/TableElements/TableCell.svelte';
	import TableHeader from '$lib/components/DataDisplay/TableElements/TableHeader.svelte';

	import { filterItems, makePlaceholderText } from '$lib/components/ComponentLogic/tableLogic.js';
	// variables
	export let data = [];
	export let caption = '';
	const legendcaption = 'Meaning of indicators';

	export let statusIndicator = {
		good: 'bg-green-500',
		bad: 'bg-red-500',
		warn: 'bg-yellow-500'
	};

	export let statusColumns = ['status'];
	export let searchableColumns = ['name'];
	// functionality
	let searchTerm = '';

	// toString here for generality
	$: filteredItems = filterItems(data, searchTerm, searchableColumns);

	// make the placeholdertext for the searchbar dynamic
	const numCols = Object.keys(data[0]).length;
	const placeholderText = makePlaceholderText(data, searchableColumns);
</script>

<TableSearch
	placeholder={placeholderText}
	bind:inputValue={searchTerm}
	hoverable={true}
	striped={true}
>
	<TableHeader {caption} columns={Object.keys(data[0])} />
	<TableBody tableBodyClass="divide-y">
		{#each filteredItems as item}
			<TableBodyRow>
				{#each Object.entries(item) as pair}
					<TableCell key={pair[0]} value={pair[1]} {statusIndicator} {statusColumns} />
				{/each}
			</TableBodyRow>
		{/each}
	</TableBody>
</TableSearch>
