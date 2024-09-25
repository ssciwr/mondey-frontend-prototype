<script lang="ts">
	import { Radio } from 'flowbite-svelte';
	export let value: any;
</script>

<div class={'flex grid w-full auto-cols-auto grid-flow-col flex-col ' + $$props.class}>
	{#each $$props.items as item, index}
		<Radio bind:group={value} value={item.value}>{item.label}</Radio>
	{/each}
</div>
