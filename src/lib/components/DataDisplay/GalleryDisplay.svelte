<script>
	import { Gallery, Heading } from 'flowbite-svelte';
	export let data;
	export let header;
	export let itemComponent;
	export let componentProps;
</script>

{#if header}
	<Heading
		tag="h1"
		class="mb-2  tracking-tight "
		customSize="text-2xl"
		color="text-gray-900 dark:text-white"
	>
		{header}
	</Heading>
{/if}

<Gallery class="grid-cols-1 justify-center gap-8 md:grid-cols-2">
	{#each data as item}
		<svelte:component this={itemComponent} data={item} props={componentProps} />
	{/each}
</Gallery>
