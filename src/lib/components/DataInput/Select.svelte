<script lang="ts">
	import { Label, Select } from 'flowbite-svelte';
	export let value: string;
</script>

{#if $$props.label}
	<Label class="font-semibold text-gray-700 dark:text-gray-400">{$$props.label}</Label>
{/if}

<div>
	<Select
		size="lg"
		class="mb-3 font-normal leading-tight text-gray-700 dark:text-gray-400"
		items={$$props.items.map((v) => {
			return {
				name: String(v),
				value: v
			};
		})}
		placeholder={$$props.about}
		bind:value
	/>
</div>
