<script lang="ts">
	import { Radio, RadioButton } from 'flowbite-svelte';

	export let value: any;
	let windowWidth = 1920;
	$: smallScreen = windowWidth < 800;
</script>

<svelte:window bind:innerWidth={windowWidth} />

<div class="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
	{#if smallScreen}
		{#each $$props.items as item, index}
			<RadioButton class="mx-2" bind:group={value} value={item.value}>{item.label}</RadioButton>
		{/each}
	{:else}
		{#each $$props.items as item, index}
			<Radio class="mx-2" bind:group={value} value={item.value}>{item.label}</Radio>
		{/each}
	{/if}
</div>
