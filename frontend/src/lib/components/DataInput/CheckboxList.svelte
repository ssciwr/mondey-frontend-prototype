<script lang="ts">
	import Checkbox from '$lib/components/DataInput/Checkbox.svelte';

	export let value: any;
	export let unique: boolean = false;

	let selected: boolean[] = $$props.items.map((e) => false);
</script>

<div class="flex flex grid w-full auto-cols-auto grid-flow-col flex-col">
	{#each $$props.items as item, index}
		<Checkbox
			bind:checked={selected[index]}
			label={item.label}
			on:changed={() => {
				if (unique) {
					selected = selected.map((_, i) => {
						return i === index && selected[index];
					});

					if (selected[index] === true) {
						value = $$props.items[index].value;
					} else {
						value = null;
					}
				} else {
					if (value instanceof Array === false) {
						value = [];
					}
					if (selected[index] === true) {
						value.push($$props.items[index].value);
						value = [...new Set(value)];
					} else {
						value = value.filter((v) => v !== $$props.itmes[index].value);
					}
				}
			}}
		/>
	{/each}
</div>
