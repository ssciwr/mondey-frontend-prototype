<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	function handleChange(event) {
		dispatch('changed', { checked: event.target.checked });
	}

	export let checked: boolean;
	export let label: string;
</script>

<label class="m-1 p-1 text-gray-700 dark:text-gray-400">
	{label}
	<input
		type="checkbox"
		bind:checked
		on:change={handleChange}
		class="rounded text-primary-700 dark:text-primary-700"
	/>
</label>
