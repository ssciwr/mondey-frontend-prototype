<script>
	import { BottomNavItem, Tooltip } from 'flowbite-svelte';

	export let description;
	export let href;
	export let Icon;
	export let tooltip;
	export let componentProps = {};
</script>

<BottomNavItem
	{href}
	btnName={description}
	btnClass="text-gray-500 dark:text-gray-400 hover:text-primary-800 dark:hover:text-primary-500 group-hover:text-primary-800 dark:group-hover:text-primary-500"
>
	<svelte:component this={Icon} {...componentProps} />
	<Tooltip arrow={false}>{tooltip}</Tooltip>
</BottomNavItem>
