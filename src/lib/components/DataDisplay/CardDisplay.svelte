<script>
	import { Button, Card } from 'flowbite-svelte';
	import { ArrowRightOutline } from 'flowbite-svelte-icons';
	export let data = {
		header: undefined,
		summary: undefined,
		button: undefined,
		href: undefined,
		image: undefined
	};

	export let styleProps = {
		card: {},
		header: {},
		summary: {},
		button: {}
	};
</script>

<Card
	img={data.image}
	imgClass="max-md:hidden object-scale-down"
	href={data.button ? null : data.href}
	class={data.button
		? 'm-2 max-w-prose'
		: 'hover:transition-color m-2 max-w-prose cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-600'}
	{...styleProps.card}
>
	{#if data.header}
		<h5
			class="mb-2 text-2xl font-bold tracking-tight text-gray-700 dark:text-white"
			{...styleProps.header}
		>
			{data.header}
		</h5>
	{/if}
	{#if data.summary}
		<p
			class="mb-3 flex font-normal leading-tight text-gray-700 dark:text-gray-400"
			{...styleProps.summary}
		>
			{data.summary}
		</p>
	{/if}
	{#if data.button}
		<Button href={data.href} class="w-fit" {...styleProps.button}
			>{data.button} <ArrowRightOutline class="ms-2 h-6 w-6 text-white" /></Button
		>
	{/if}
</Card>
