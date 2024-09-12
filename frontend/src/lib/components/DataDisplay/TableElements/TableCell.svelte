<script>
	import { TableBodyCell } from 'flowbite-svelte';

	export let value;
	export let statusIndicator;
	export let statusColumns;
	export let key;
</script>

{#if statusColumns.includes(key)}
	<TableBodyCell class={statusIndicator[value]}>{value}</TableBodyCell>
{:else}
	<TableBodyCell>{value}</TableBodyCell>
{/if}
