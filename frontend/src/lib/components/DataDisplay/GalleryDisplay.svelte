<script context="module">
	export function filterDataByColumn(data, col, searchTerm) {
		if (searchTerm === '') {
			return data;
		} else {
			return data.filter((item) => item[col].toLowerCase().includes(searchTerm.toLowerCase()));
		}
	}
</script>

<script>
	import { Button, Gallery, Heading, Search } from 'flowbite-svelte';
	import { SearchOutline } from 'flowbite-svelte-icons';

	export let data;
	export let header = null;
	export let itemComponent;
	export let withSearch = true;
	export let searchableCol = '';
	export let componentProps;

	// dynamic statements
	let searchTerm = '';
	$: filteredItems =
		withSearch === true ? filterDataByColumn(data, searchableCol, searchTerm) : data;
</script>

{#if header !== null}
	<Heading
		tag="h1"
		class="mb-2  tracking-tight "
		customSize="text-2xl"
		color="text-gray-900 dark:text-white"
	>
		{header}
	</Heading>
{/if}

{#if withSearch}
	<form class="mt-4 flex gap-2">
		<Search size="md" placeholder={'Durchsuchen'} bind:value={searchTerm} />
		<Button class="!p-2.5">
			<SearchOutline class="h-6 w-6" />
		</Button>
	</form>
{/if}

<Gallery class="grid grid-cols-1 justify-center gap-8 p-4 md:grid-cols-2">
	{#each filteredItems as item, index}
		<svelte:component this={itemComponent} data={item} styleProps={componentProps[index]} />
	{/each}
</Gallery>
