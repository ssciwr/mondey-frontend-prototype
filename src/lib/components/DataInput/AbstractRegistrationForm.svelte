<script>
	import { Card, Heading } from 'flowbite-svelte';
	import AbstractDataInput from './AbstractDataInput.svelte';
	export let props = [];
	export let heading = null;
	export let buttons = null;
	export let description = null;
</script>

<div class="m-1 items-center justify-center pb-6">
	<Card>
		{#if heading}
			<Heading
				tag="h3"
				class="m-1 mb-3 p-1 text-center font-bold tracking-tight text-gray-700 dark:text-gray-400"
				>{heading}</Heading
			>
		{/if}
		<AbstractDataInput {props} {buttons} {description} />
	</Card>
</div>
