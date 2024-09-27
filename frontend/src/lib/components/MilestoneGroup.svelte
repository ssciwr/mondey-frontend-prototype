<script lang="ts">
	import CardDisplay from '$lib/components/DataDisplay/CardDisplay.svelte';
	import GalleryDisplay from '$lib/components/DataDisplay/GalleryDisplay.svelte';
	import { createStyle, getData } from '$lib/components/MilestoneGroup';
	import Breadcrumbs from '$lib/components/Navigation/Breadcrumbs.svelte';

	export let breadcrumbdata: any[] = [];
	export let data: any[] = [];
	export let searchData: any[] = [];


</script>

<div class="flex flex-col border border-gray-200 md:rounded-t-lg dark:border-gray-700">
	<Breadcrumbs data={breadcrumbdata} />
	<div class="grid gap-y-8">
		<GalleryDisplay
			data={data.sort((a, b) => a.progress - b.progress)}
			itemComponent={CardDisplay}
			componentProps={createStyle(data)}
			withSearch={true}
			{searchData}
		/>
	</div>
</div>
