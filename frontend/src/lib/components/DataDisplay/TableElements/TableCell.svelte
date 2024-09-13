<script lang="ts">
	import { TableBodyCell } from 'flowbite-svelte';

	export let value;
	export let statusIndicator;
	export let statusColumns;
	export let key;
	export let href: string = '';
</script>

{#if statusColumns.includes(key)}
	<TableBodyCell class={statusIndicator[value]}>
		{#if href !== ''}
			<a {href}>{value}</a>
		{:else}
			{value}
		{/if}
	</TableBodyCell>
{:else}
	<TableBodyCell>
		{#if href !== ''}
			<a {href}>{value}</a>
		{:else}
			{value}
		{/if}
	</TableBodyCell>
{/if}
