<script lang="ts">
	import { Label, Select } from 'flowbite-svelte';

	export let value: string;
	export let valid: Boolean;
	export let cls: String = '';

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
		class={(!valid && $$props.required === true
			? 'border-6 border-primary-600 dark:border-primary-600'
			: '') + cls}
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
