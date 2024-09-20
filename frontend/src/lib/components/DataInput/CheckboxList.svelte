<script lang="ts">
	import { Checkbox } from 'flowbite-svelte';

	function handleChange(index: number) {
		if (selected[index] === true) {
			if (unique) {
				value = $$props.items[index].value;
				selected = selected.map((_, i) => i === index);
			} else {
				value.push($$props.items[index].value);
			}
		} else {
			if (unique === true) {
				value = null;
			} else {
				value = value.filter((v: string) => v !== $$props.items[index].value);
			}
		}
		console.log('running handler: ', selected, value);
	}

	export let value: any;
	export let unique: boolean = false;
	let selected = $$props.items.map((element: any) => element.value === value);
</script>

<div
	class="xl:grid-cols-4flex grid w-full grid-cols-1 flex-col gap-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
>
	{#each $$props.items as element, index}
		<Checkbox bind:checked={selected[index]} on:change={() => handleChange(index)}
			>{element.label}</Checkbox
		>
	{/each}
</div>
