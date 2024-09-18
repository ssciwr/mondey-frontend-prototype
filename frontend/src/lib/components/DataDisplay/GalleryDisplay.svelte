<script context="module">
	export function filterDataByColumn(data, col, searchTerm) {
		if (searchTerm === '') {
			return data;
		} else {
			return data.filter((item) => item[col].toLowerCase().includes(searchTerm.toLowerCase()));
		}
	}
</script>

<script lang="ts">
	import { Gallery, Heading, Search } from 'flowbite-svelte';

	export let data;
	export let header: string | null = null;
	export let itemComponent;
	export let withSearch = true;
	export let searchableCol = '';
	export let componentProps;

	// dynamic statements
	let searchTerm = '';
	$: filteredItems =
		withSearch === true ? filterDataByColumn(data, searchableCol, searchTerm) : data;
</script>

<div class="mx-auto max-w-7xl p-4">
	{#if header !== null}
		<Heading
			tag="h1"
			class="m-2 mt-4 flex w-full gap-2 p-2 tracking-tight "
			customSize="text-2xl"
			color="text-gray-800 dark:text-white"
		>
			{header}
		</Heading>
	{/if}

	{#if withSearch}
		<form class="m-2 mt-4 flex w-full gap-2 p-2">
			<Search size="md" placeholder={'Durchsuchen'} bind:value={searchTerm} />
		</form>
	{/if}

	<Gallery
		class="grid w-full grid-cols-1 justify-center gap-8 p-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
	>
		{#each filteredItems as item, index}
			<svelte:component this={itemComponent} data={item} styleProps={componentProps[index]} />
		{/each}
	</Gallery>
</div>
