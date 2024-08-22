<script context="module">
	// this will go into the backend at the end?

	export function splitDataIntoPages(datasize, pagesize) {
		let start = 0;
		let stop = pagesize;
		let indices = [];
		while (stop < datasize - pagesize) {
			stop = start + pagesize;
			indices.push([start, stop]);
			start = stop;
		}

		// add last element
		indices.push([start, datasize]);
		return indices;
	}
</script>

<script>
	import CardDisplay from '$lib/components/DataDisplay/CardDisplay.svelte';
	import { Gallery } from 'flowbite-svelte';
	export let data;
	export let n = 3;
	export let m = 2;
	export let header = 'Currently monitored children';
	let pageindices = splitDataIntoPages(Object.keys(data).length, n * m);
</script>

<h1 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{header}</h1>
<Gallery class="grid-cols-2 gap-4 md:grid-cols-3">
	{#each data.slice(pageindices[0][0], pageindices[0][1]) as item}
		<CardDisplay
			header={item.name}
			link={item.link}
			image="/children.png"
			button={'Current surveys'}
		/>
	{/each}
</Gallery>
