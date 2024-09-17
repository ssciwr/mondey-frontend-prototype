<script lang="ts">
	// README: wrt event handlers: in svelte 5 there is a better solution to this, but since we don´t have this yet and
	// the svelte 4 solution requires a lot of boilerplate code (https://github.com/sveltejs/svelte/issues/2837#issuecomment-1848225140)
	// currently there are some hardcoded event handlers

	import { Label, Textarea } from 'flowbite-svelte';
	import { onMount } from 'svelte';

	// component lifecycle. Sets the textfield value to the held value if showtextfield is set to true externally
	onMount(() => {
		if (showTextField === true) {
			additionalInput = value;
		}
	});

	// public variables
	export let component: any;
	export let value: any = null;
	export let label: string | null = null;
	export let componentClass: string = '';
	export let textTrigger: string = 'noAdditionalText';
	export let showTextField: boolean = false;
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
				return additionalInput as typeof value;
			}
		} else {
			return toupdate;
		}
	}

	function checkShowTextfield(v: any) {
		// showTextField needs to stay true once it has been set once.
		if (v instanceof Array) {
			console.log('  ', showTextField, v, textTrigger, v.includes(textTrigger));
			return showTextField || v.includes(textTrigger);
		} else {
			console.log('  ', showTextField, v, textTrigger, v === textTrigger);
			return showTextField || v === textTrigger;
		}
	}

	// // reactive statement that makes sure 'valid' updates the page
	$: valid = value !== undefined && value !== null && value !== '' && checkValid();
	$: highlight = !valid && properties.required === true;
	$: showTextField = checkShowTextfield(value);
	$: console.log('value: ', value, 'showtextfield: ', showTextField, properties.name);
</script>

{#if label}
	<Label class="font-semibold text-gray-700 dark:text-gray-400">{label}</Label>
{/if}

<div class="space-y-4">
	<svelte:component
		this={component}
		class={highlight
			? 'border-primary-600 dark:border-primary-600 border-2' + componentClass
			: componentClass}
		bind:value
		{...properties}
		on:blur={eventHandlers['on:blur']}
		on:change={eventHandlers['on:change']}
		on:click={eventHandlers['on:click']}
	/>

	{showTextField}
	{#if showTextField === true}
		<Textarea
			bind:value={additionalInput}
			on:blur={(value = updateValue(value, additionalInput))}
		/>
	{/if}
</div>
