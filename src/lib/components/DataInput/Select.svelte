<script lang="ts">
	import { Label, Select } from 'flowbite-svelte';

	export let value: string;
	export let valid: Boolean = true;

	export function validate(value: unknown): void {
		if (value !== undefined && value !== null && value !== '') {
			valid = true;
		} else {
			valid = false;
		}
	}
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
		on:change={(event) => {
			validate(event.srcElement.value);
		}}
	/>
</div>
