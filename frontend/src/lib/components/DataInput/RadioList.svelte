<script lang="ts">
	import { Radio } from 'flowbite-svelte';
	export let value: any;
</script>

<div class="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
	{#each $$props.items as item, index}
		<Radio class="mx-2" bind:group={value} value={item.value}>{item.label}</Radio>
	{/each}
</div>
