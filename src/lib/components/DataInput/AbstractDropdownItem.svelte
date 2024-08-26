<script>
	import { Select, Tooltip } from 'flowbite-svelte';
	// have the data processing here to coerce the input into the format that the component expects
	// @ts-ignore
	const items = $$props.items.map((item) => ({ name: item, value: item }));
</script>

<div>
	<Select
		size="lg"
		class="mb-3 font-normal leading-tight text-gray-700 dark:text-gray-400"
		{items}
		placeholder={$$props.name}
		bind:value={$$props.selected}
	/>
	{#if $$props.about}
		<Tooltip>{$$props.about}</Tooltip>
	{/if}
</div>
