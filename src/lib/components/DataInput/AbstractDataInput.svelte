<script>
	import { Heading } from 'flowbite-svelte';
	export let props = [];
	export let heading = null;
	export let description = null;
</script>

<div class="space-y-6rtl:space-x-reverse items-center space-x-4">
	{#if heading}
		<Heading
			tag="h1"
			class="mb-6 p-6 text-2xl font-bold tracking-tight text-gray-700 dark:text-gray-400"
		>
			{heading}
		</Heading>
	{/if}

	{#if description}
		<p class="mb-6 text-lg font-normal leading-tight text-gray-700 dark:text-gray-400">
			{description}
		</p>
	{/if}

	<form class="flex flex-col space-y-6">
		{#each props as prop}
			<svelte:component this={prop.itemComponent} {...prop.componentProps} />
		{/each}
	</form>
</div>
