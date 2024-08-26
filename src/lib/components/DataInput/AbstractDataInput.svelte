<script>
	import NavigationButtons from '../Navigation/NavigationButtons.svelte';
	import { Button, ButtonGroup, Heading } from 'flowbite-svelte';
	export let props = [];
	export let heading = null;
	export let description = null;
	export let buttons = null;
</script>

<div class="space-y-6rtl:space-x-reverse items-center justify-center space-x-4">
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
			{#if prop.label}
				<label
					for={prop.componentProps.name}
					class="text-lg font-normal text-gray-700 dark:text-gray-400"
				>
					{prop.label}
				</label>
			{/if}
			<svelte:component this={prop.itemComponent} {...prop.componentProps} />
		{/each}
	</form>

	{#if buttons}
		<NavigationButtons {buttons} />
	{/if}

</div>
