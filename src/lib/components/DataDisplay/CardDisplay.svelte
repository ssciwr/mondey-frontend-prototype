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
	export let props = {};
</script>

<Card
	img={data.image}
	{...props}
	class="hover:transition-color m-2 max-w-prose hover:bg-gray-300 dark:hover:bg-gray-600"
>
	{#if data.header}
		<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-700 dark:text-white">
			{data.header}
		</h5>
	{/if}
	{#if data.summary}
		<p class="mb-3 flex font-normal leading-tight text-gray-700 dark:text-gray-400">
			{data.summary}
		</p>
	{/if}
	{#if data.button}
		<Button href={data.link} class="w-fit"
			>{data.button} <ArrowRightOutline class="ms-2 h-6 w-6 text-white" /></Button
		>
	{/if}
</Card>
