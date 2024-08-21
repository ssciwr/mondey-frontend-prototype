<script>
	import { Label, Select, Tooltip } from 'flowbite-svelte';
	export let data;

	// have the data processing here to coerce the input into the format that the component expects
	// @ts-ignore
	data.items = data.items.map((item) => ({ name: item, value: item }));
</script>

<div>
	<div class="flex items-center space-x-2">
		<Label for="select-lg" class="mb-2 text-lg text-gray-700 dark:text-gray-400">{data.name}</Label>
		<Tooltip>{data.about}</Tooltip>
	</div>
	<Select
		size="lg"
		class="mb-3 font-normal leading-tight text-gray-700 dark:text-gray-400"
		items={data.items}
		bind:value={data.selected}
	/>
</div>
