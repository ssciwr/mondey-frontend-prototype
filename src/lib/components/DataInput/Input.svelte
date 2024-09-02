<script lang="ts">
	import { Input, type InputType, Label } from 'flowbite-svelte';
	interface Element {
		name: String;
		type: InputType | String;
		value: unknown;
		placeholder: String;
		required: Boolean;
		label: String | undefined;
	}

	export let element: Element;
	export let cls: String = '';
	export let missing: Boolean = false;
</script>

{#if element.label}
	<Label class="font-semibold text-gray-700 dark:text-gray-400">{element.label}</Label>
{/if}

<Input
	class={(missing && element.required === true
		? 'bg-primary-600 text-white dark:bg-primary-600'
		: '') + cls}
	placeholder={element.placeholder}
	type={element.type}
	bind:value={element.value}
	on:change={(event) => {
		if (missing) {
			if (element.value !== undefined && element.value !== null && element.value !== '') {
				missing = false;
			}
		}
	}}
/>
