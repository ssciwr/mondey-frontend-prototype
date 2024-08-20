<script>
	// @ts-nocheck
	import { Button, Label, Select, Tooltip } from 'flowbite-svelte';
	import { LightbulbSolid } from 'flowbite-svelte-icons';
	/**
	 * @type {any[]}
	 */
	// @ts-ignore
	export let dropdownData = [];
	export let heading = 'dummy dropdown data';
	const textColors = 'text-gray-700 dark:text-gray-400 ';
	const basicColorBehavior =
		textColors +
		'hover:text-primary-800 dark:hover:text-primary-500 group-hover:text-primary-800 dark:group-hover:text-primary-500 ';
	const headerStyle = 'mb-2 text-2xl font-bold tracking-tight ' + textColors;
	const paragraphStyle = 'mb-3 font-normal leading-tight ' + textColors;
	const symbolStyle = 'h-6 w-6 ' + textColors;
	const labelStyle = 'mb-2 text-lg ' + textColors;
	const labelContainerStyle = 'flex items-center space-x-2 ';
	const buttonStyle = ' ';
</script>

<div class="items-center space-x-4 rtl:space-x-reverse">
	<h1 class={headerStyle}>{heading}</h1>
	{#each dropdownData as dropdown}
		<div class={paragraphStyle}>
			<div class={labelContainerStyle}>
				<Label for="select-lg" class={labelStyle}>{dropdown.name}</Label>
				<Button btnClass={buttonStyle} color="light"><LightbulbSolid class={symbolStyle} /></Button>
				<Tooltip>Hilfe</Tooltip>
			</div>
			<Select size="lg" class="mb-6" items={dropdown.items} bind:value={dropdown.selected} />
			<Tooltip>{dropdown.about}</Tooltip>
		</div>
	{/each}
</div>
