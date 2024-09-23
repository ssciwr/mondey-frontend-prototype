<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	function handleChange(event) {
		dispatch('changed', { checked: event.target.checked });
	}

	export let checked: boolean;
	export let label: string;
</script>

<label>
	{label}
	<input type="checkbox" bind:checked on:change={handleChange} />
</label>
