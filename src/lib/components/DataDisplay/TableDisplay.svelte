<script>
	import {
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell,
		TableSearch
	} from 'flowbite-svelte';

	// variables
	export let data = [{ id: 1, name: 'testA', time: 2017, status: 'good' }];

	export let caption =
		'Hier finden sie eine Übersicht über alle abgeschlossenen und ausstehenden Meilensteine für die momentane Bestandsaufnahme.';

	export let statusIndicator = {
		good: 'bg-green-500',
		bad: 'bg-red-500',
		warn: 'bg-yellow-500'
	};

	export let statusColumns = ['status'];

	export let searchableColumns = ['name'];
	// functionality
	let searchTerm = '';

	// make the placeholdertext for the searchbar dynamic
	const numCols = Object.keys(data[0]).length;
	let placeholderText = 'Search ' + searchableColumns[0];

	if (searchableColumns.length > 1 && searchableColumns.length < numCols - 1) {
		placeholderText = 'Search ' + `any of ${searchableColumns.join(', ')}`;
	} else if (searchableColumns.length >= numCols - 1 && searchableColumns.length < numCols) {
		const difference = Object.keys(data[0]).filter((key) => !searchableColumns.includes(key));
		placeholderText = 'Search all columns except ' + `${difference.join(', ')}`;
	} else if (searchableColumns.length === numCols) {
		placeholderText = 'Search all columns';
	}

	// TODO: adjust this to searchable stuff
	$: filteredItems = data.filter(
		(item) => item.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
	);
</script>

<TableSearch
	placeholder={placeholderText}
	hoverable={true}
	bind:inputValue={searchTerm}
	striped={true}
	shadow
>
	<caption class="mb-3 font-normal leading-tight text-gray-700 dark:text-gray-400">
		{caption}
	</caption>
	<TableHead>
		{#each Object.keys(data[0]) as key}
			<TableHeadCell>{key}</TableHeadCell>
		{/each}
	</TableHead>
	<TableBody tableBodyClass="divide-y">
		{#each filteredItems as item}
			<TableBodyRow>
				{#each Object.entries(item) as pair}
					{#if statusColumns.includes(pair[0])}
						<TableBodyCell class={statusIndicator[pair[1]]}>{pair[1]}</TableBodyCell>
					{:else}
						<TableBodyCell>{pair[1]}</TableBodyCell>
					{/if}
				{/each}
			</TableBodyRow>
		{/each}
	</TableBody>
</TableSearch>
