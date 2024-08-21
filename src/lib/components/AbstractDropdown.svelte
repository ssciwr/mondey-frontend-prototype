<script>
	import AbstractItem from './AbstractDropdownItem.svelte';
	// @ts-nocheck
	/**
	 * @type {any[]}
	 */
	// @ts-ignore
	export let data = [];
	export let heading = 'dummy dropdown data';
</script>

<div class="items-center space-x-4 rtl:space-x-reverse">
	<h1 class="mb-2 text-2xl font-bold tracking-tight text-gray-700 dark:text-gray-400">{heading}</h1>
	{#each data as data_element}
		<AbstractItem data={data_element} />
	{/each}
</div>
