<script>
	// @ts-nocheck
	import { Label, Select, Tooltip } from 'flowbite-svelte';
	import { LightbulbSolid } from 'flowbite-svelte-icons';

	/**
	 * @type {any[]}
	 */
	// @ts-ignore
	export let dropdownData = [];
	export let heading = 'dummy dropdown data';
	const headerStyle = 'mb-2 text-2xl font-bold tracking-tight text-gray-700 dark:text-gray-400';
	const paragraphStyle = 'mb-3 font-normal text-gray-700 dark:text-gray-400 leading-tight';
	const symbolStyle = 'h-6 w-6 text-gray-700 dark:text-gray-400';
	const labelStyle = 'mb-2 text-lg text-gray-700 dark:text-gray-400';
</script>

<div class="items-center space-x-4 rtl:space-x-reverse">
	<h1 class={headerStyle}>{heading}</h1>
	{#each dropdownData as dropdown}
		<div class={paragraphStyle}>
			<Label for="select-lg" class={labelStyle}>{dropdown.name}</Label>
			<LightbulbSolid class={symbolStyle}></LightbulbSolid>
			<Select size="lg" class="mb-6" items={dropdown.items} bind:value={dropdown.selected} />
			<Tooltip>{dropdown.about}</Tooltip>
		</div>
	{/each}
</div>
