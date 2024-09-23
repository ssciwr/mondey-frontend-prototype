<script lang="ts">
	import Checkbox from '$lib/components/DataInput/Checkbox.svelte';

	export let value: any;
	export let unique: boolean = false;

	let selected: boolean[] = $$props.items.map((e) => false);

	$: console.log('unique: ', unique, 'value: ', value, 'selected:', selected);
</script>

<div
	class="xl:grid-cols-4flex grid w-full grid-cols-1 flex-col gap-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
>
	{#each $$props.items as item, index}
		<Checkbox
			bind:checked={selected[index]}
			label={item.label}
			on:changed={() => {
				if (unique) {
					value = $$props.items[index].value;
					selected = selected.map((_, i) => {
						return i === index && selected[index];
					});
				} else {
				}
			}}
		/>
	{/each}
</div>
