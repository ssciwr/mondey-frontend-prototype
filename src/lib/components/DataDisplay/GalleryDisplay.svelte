<script>
	import { Gallery } from 'flowbite-svelte';
	export let data;
	export let header;
	export let itemComponent;
	export let componentProps;
</script>

{#if header}
	<h1 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{header}</h1>
{/if}

<Gallery class="grid-cols-1 gap-y-12 md:grid-cols-2">
	{#each data as item}
		<svelte:component this={itemComponent} data={item} props={componentProps} />
	{/each}
</Gallery>
