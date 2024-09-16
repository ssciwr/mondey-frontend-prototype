<script lang="ts">
	// README: wrt event handlers: in svelte 5 there is a better solution to this, but since we don´t have this yet and
	// the svelte 4 solution requires a lot of boilerplate code (https://github.com/sveltejs/svelte/issues/2837#issuecomment-1848225140)
	// currently there are some hardcoded event handlers

	import { Label, Textarea } from 'flowbite-svelte';

	// public variables
	export let component: any;
	export let value: any = null;
	export let label: string | null = null;
	export let componentClass: string = '';
	export let textTrigger: string = 'noAdditionalText';
	let showTextField: boolean = false;
	let basicInput: any;
	let additionalInput: any;

	// properties and event handlers
	export let properties: any = {};
	export let eventHandlers: { [key: string]: (event: Event) => void | Promise<void> } = {};

	// custom valid checker that can optionally be supplied
	export let checkValid = () => {
		return true;
	};

	// internal variables and functionality

	function replaceValue(arrayvalue: any[], target: any, element: any): void {
		for (let i = 0; i < arrayvalue.length; i++) {
			if (arrayvalue[i] === target && element) {
				arrayvalue[i] = element;
			}
		}
	}

	function updateValue(toupdate: any, additionalInput: string): any {
		if (showTextField) {
			if (toupdate instanceof Array) {
				replaceValue(toupdate, textTrigger, additionalInput);
				return toupdate;
			} else {
				return additionalInput as typeof basicInput;
			}
		} else {
			return toupdate;
		}
	}

	function checkShowTextfield(basicInput: any) {
		if (basicInput instanceof Array) {
			return basicInput.includes(textTrigger);
		} else {
			return basicInput === textTrigger;
		}
	}

	// // reactive statement that makes sure 'valid' updates the page
	$: valid = value !== undefined && value !== null && value !== '' && checkValid();
	$: highlight =
		!valid && properties.required === true
			? 'border-primary-600 dark:border-primary-600 border-2'
			: '';

	$: showTextField = basicInput && textTrigger ? checkShowTextfield(basicInput) : false;
	$: value = basicInput;
</script>

{#if label}
	<Label class="font-semibold text-gray-700 dark:text-gray-400">{label}</Label>
{/if}

<div class="space-y-4">
	<svelte:component
		this={component}
		class={highlight + componentClass}
		bind:value={basicInput}
		{...properties}
		on:blur={eventHandlers['on:blur']}
		on:change={eventHandlers['on:change']}
		on:click={eventHandlers['on:click']}
	/>

	{#if showTextField === true}
		<Textarea
			bind:value={additionalInput}
			on:blur={(event) => {
				value = updateValue(value, event.srcElement.value);
			}}
		/>
	{/if}
</div>
