<script lang="ts">
	import { Input, type InputType, Label } from 'flowbite-svelte';
	interface Element {
		name: String;
		type: InputType | String | undefined;
		placeholder: String;
		required: Boolean;
		label: String | undefined;
	}

	export let value: unknown;

	export let element: Element;
	export let cls: String = '';
	export let valid: Boolean = true;
	export function validate(value: unknown): void {
		if (value !== undefined && value !== null && value !== '') {
			valid = true;
		} else {
			valid = false;
		}
	}
	// do the validation of the input internally here or at least allow for a function to be passed
</script>

{#if element.label}
	<Label class="font-semibold text-gray-700 dark:text-gray-400">{element.label}</Label>
{/if}

<Input
	class={(!valid && element.required === true
		? 'bg-primary-600 text-white dark:bg-primary-600'
		: '') + cls}
	placeholder={element.placeholder}
	type={element.type}
	bind:value
	on:change={(event) => {
		validate(event.target);
	}}
/>
