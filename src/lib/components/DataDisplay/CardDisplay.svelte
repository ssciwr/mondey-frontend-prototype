<script>
	import { Button, Card } from 'flowbite-svelte';
	import { ArrowRightOutline } from 'flowbite-svelte-icons';
	export let data = {
		header: undefined,
		summary: undefined,
		button: undefined,
		href: undefined,
		image: undefined,
		props: {
			header: {},
			summary: {},
			button: {}
		}
	};
</script>

<Card
	img={data.image}
	href={data.button ? null : data.href}
	class="hover:transition-color m-2 max-w-prose cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-600"
	{...data.props}
>
	{#if data.header}
		<h5
			class="mb-2 text-2xl font-bold tracking-tight text-gray-700 dark:text-white"
			{...data.props.header}
		>
			{data.header}
		</h5>
	{/if}
	{#if data.summary}
		<p
			class="mb-3 flex font-normal leading-tight text-gray-700 dark:text-gray-400"
			{...data.props.summary}
		>
			{data.summary}
		</p>
	{/if}
	{#if data.button}
		<Button href={data.href} class="w-fit" {...data.props.button}
			>{data.button} <ArrowRightOutline class="ms-2 h-6 w-6 text-white" /></Button
		>
	{/if}
</Card>
