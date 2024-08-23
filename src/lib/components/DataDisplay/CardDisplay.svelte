<script>
	import { Button, Card } from 'flowbite-svelte';
	import { ArrowRightOutline } from 'flowbite-svelte-icons';
	export let data = {
		header: undefined,
		summary: undefined,
		button: undefined,
		link: undefined,
		image: undefined
	};
	export let props = { class: 'm-4 w-full p-6' };
</script>

<div class="space-y-4">
	<Card img={data.image} {...props}>
		{#if data.header}
			<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
				{data.header}
			</h5>
		{/if}
		{#if data.summary}
			<p class="mb-3 font-normal leading-tight text-gray-700 dark:text-gray-400">
				{data.summary}
			</p>
		{/if}
		{#if data.button}
			<Button href={data.link} class="w-fit"
				>{data.button} <ArrowRightOutline class="ms-2 h-6 w-6 text-white" /></Button
			>
		{/if}
	</Card>
</div>
