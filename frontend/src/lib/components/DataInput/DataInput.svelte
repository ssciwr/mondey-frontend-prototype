<script lang="ts">
	// README: wrt event handlers: in svelte 5 there is a better solution to this, but since we don´t have this yet and
	// the svelte 4 solution requires a lot of boilerplate code (https://github.com/sveltejs/svelte/issues/2837#issuecomment-1848225140)
	// currently there are some hardcoded event handlers

	import { Label, Textarea } from 'flowbite-svelte';

	// variables
	export let component: any;
	export let value: any = null;
	export let label: string | null = null;
	export let componentClass: string = '';
	export let textTrigger: string = 'noAdditionalText';
	export let showTextField: boolean = false;
	export let additionalInput: any = value;

	// data to display and event handlers for dynamcis.
	export let properties: any = {};

	// README: This structure is not necessary here yet, as the events could be exposed directly,
	// but will afais be useful later in svelte5
	export let eventHandlers: { [key: string]: (event: Event) => void | Promise<void> } = {};

	// custom valid checker that can optionally be supplied
	export let checkValid = () => {
		return true;
	};

	// functionality for showing the textfield when the trigger is selected
	function checkShowTextfield(v: any, trigger: string) {
		if (v instanceof Array) {
			return v.includes(trigger);
		} else {
			return v === trigger;
		}
	}

	// reactive statement that makes sure 'valid' updates the page
	$: valid = value !== undefined && value !== null && value !== '' && checkValid();
	$: highlight = !valid && properties.required === true;
	$: showTextField = showTextField || checkShowTextfield(value, textTrigger);
</script>

{#if label}
	<Label class="font-semibold text-gray-700 dark:text-gray-400">{label}</Label>
{/if}

<div class="space-y-4">
	<svelte:component
		this={component}
		class={highlight
			? 'border-2 border-primary-600 dark:border-primary-600' + componentClass
			: componentClass}
		bind:value
		{...properties}
		on:blur={eventHandlers['on:blur']}
		on:change={eventHandlers['on:change']}
		on:click={eventHandlers['on:click']}
	/>

	{#if showTextField === true}
		<Textarea bind:value={additionalInput} />
	{/if}
</div>
