<script>
	import { Button, Card } from 'flowbite-svelte';
	import { ArrowRightOutline } from 'flowbite-svelte-icons';
	export let header = 'header';
	export let summary;
	export let button;
	export let link;
	export let image;
</script>

<div class="space-y-4">
	<Card class="m-4 w-full p-6" img={image || null} size="md" horizontal>
		<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
			{header}
		</h5>
		{#if summary}
			<p class="mb-3 font-normal leading-tight text-gray-700 dark:text-gray-400">
				{summary}
			</p>
		{/if}
		{#if button}
			<Button href={link} class="w-fit"
				>{button} <ArrowRightOutline class="ms-2 h-6 w-6 text-white" /></Button
			>
		{/if}
	</Card>
</div>
