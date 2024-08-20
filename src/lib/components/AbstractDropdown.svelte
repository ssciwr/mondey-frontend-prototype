<script>
	// @ts-nocheck
	import { Label, Select, Tooltip } from 'flowbite-svelte';
	/**
	 * @type {any[]}
	 */
	// @ts-ignore
	export let dropdownData = [];
	export let heading = 'dummy dropdown data';
	const textColors = 'text-gray-700 dark:text-gray-400';
	const basicColorBehavior =
		'hover:text-primary-800 dark:hover:text-primary-500 group-hover:text-primary-800 dark:group-hover:text-primary-500';
	const headerStyle = `mb-2 text-2xl font-bold tracking-tight ${textColors}`;
	const paragraphStyle = `mb-3 font-normal leading-tight ${textColors}`;
	const labelStyle = `mb-2 text-lg ${textColors}`;
	const labelContainerStyle = 'flex items-center space-x-2';
	const buttonStyle = `bg-transparent ${textColors} ${basicColorBehavior} focus:outline-none`;
</script>

<div class="items-center space-x-4 rtl:space-x-reverse">
	<h1 class={headerStyle}>{heading}</h1>
	{#each dropdownData as dropdown}
		<div>
			<div class={labelContainerStyle}>
				<Label for="select-lg" class={labelStyle}>{dropdown.name}</Label>
				<Tooltip>{dropdown.about}</Tooltip>
			</div>
			<Select
				size="lg"
				class={paragraphStyle}
				items={dropdown.items}
				bind:value={dropdown.selected}
			/>
		</div>
	{/each}
</div>
