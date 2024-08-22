<script>
	import { TableHead, TableHeadCell } from 'flowbite-svelte';

	export let caption;
	export let columns;
</script>

<caption class="mb-4 font-normal leading-tight text-gray-700 dark:text-gray-400">
	{caption}
</caption>
<TableHead>
	{#each columns as key, i}
		<TableHeadCell>{key}</TableHeadCell>
	{/each}
</TableHead>
