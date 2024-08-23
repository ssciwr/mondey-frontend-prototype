<script>
	import { Gallery } from 'flowbite-svelte';
	export let data;
	export let header = 'Currently monitored children';
	export let itemComponent;
	export let componentProps;
</script>

<h1 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{header}</h1>

<Gallery class="grid-cols-3 gap-4 md:grid-cols-2">
	{#each data as item}
		<svelte:component this={itemComponent} {data} {...componentProps} />
	{/each}
</Gallery>
