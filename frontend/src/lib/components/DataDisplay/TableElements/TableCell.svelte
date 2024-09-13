<script lang="ts">
	import { TableBodyCell } from 'flowbite-svelte';

	export let value;
	export let statusIndicator;
	export let statusColumns;
	export let key;
	export let href: string = null;
</script>

{#if statusColumns.includes(key)}
	<TableBodyCell class={statusIndicator[value]}><a {href}>{value}</a></TableBodyCell>
{:else}
	<TableBodyCell><a {href}>{value}</a></TableBodyCell>
{/if}
