<script>
	import {
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell,
		TableSearch
	} from 'flowbite-svelte';

	export let data = [{ id: 1, name: 'testA', time: 2017, status: 'good' }];

	export let statusIndicator = {
		good: 'bg-green-500',
		bad: 'bg-red-500',
		warn: 'bg-yellow-500'
	};

	let searchTerm = '';

	$: filteredItems = data.filter(
		(item) => item.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
	);

	function extractStatusIndicator(status) {
		return statusIndicator?.[status] || '';
	}
</script>

<TableSearch placeholder="Search test by name" hoverable={true} bind:inputValue={searchTerm}>
	<TableHead>
		<TableHeadCell>ID</TableHeadCell>
		<TableHeadCell>Name</TableHeadCell>
		<TableHeadCell>Result</TableHeadCell>
	</TableHead>
	<TableBody tableBodyClass="divide-y">
		{#each filteredItems as item}
			<TableBodyRow>
				<TableBodyCell>{item.id}</TableBodyCell>
				<TableBodyCell>{item.name}</TableBodyCell>
				<TableBodyCell color={extractStatusIndicator(item.status)}>{item.status}</TableBodyCell>
			</TableBodyRow>
		{/each}
	</TableBody>
</TableSearch>
