<script lang="ts">
	import Checkbox from '$lib/components/DataInput/Checkbox.svelte';

	export let value: any;
</script>

<div class={'flex grid w-full auto-cols-auto grid-flow-col flex-col ' + $$props.class}>
	{#each $$props.items as item, index}
		<Checkbox
			bind:checked={$$props.selected[index]}
			label={item.label}
			on:changed={() => {
				if (value instanceof Array === false) {
					value = [];
				}
				if ($$props.selected[index] === true) {
					value.push($$props.items[index].value);
					value = [...new Set(value)];
				} else {
					value = value.filter((v) => v !== $$props.items[index].value);
				}
			}}
		/>
	{/each}
</div>
