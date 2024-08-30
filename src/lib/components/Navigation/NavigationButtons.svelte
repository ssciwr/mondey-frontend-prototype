<script>
	import { Button, ButtonGroup } from 'flowbite-svelte';

	export let buttons = [];
</script>

<ButtonGroup class="mt-6 flex justify-center">
	{#each buttons as bprops}
		<Button
			href={bprops.href}
			class="dark:bg-primay-700 w-full bg-primary-700 text-center text-sm text-white hover:bg-primary-800 hover:text-white dark:hover:bg-primary-800"
			{...bprops.props}>{bprops.label}</Button
		>
	{/each}
</ButtonGroup>
