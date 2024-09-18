<script lang="ts">
	import { Breadcrumb, BreadcrumbItem } from 'flowbite-svelte';

	export let data: any[] = [];
</script>

<Breadcrumb
	olClass="inline-flex items-center space-x-1 rtl:space-x-reverse md:space-x-3 rtl:space-x-reverse flex-wrap"
	navClass="m-2"
>
	{#each data as item}
		<BreadcrumbItem href={item.href}>{item.label}</BreadcrumbItem>
	{/each}
</Breadcrumb>
