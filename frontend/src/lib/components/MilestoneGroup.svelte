<script lang="ts">
	import Breadcrumps from '$lib/components/Breadcrumps.svelte';
	import CardDisplay from '$lib/components/DataDisplay/CardDisplay.svelte';
	import GalleryDisplay from '$lib/components/DataDisplay/GalleryDisplay.svelte';
	export let breadcrumpdata: any[] = [];
	export let milestonedata: any[] = [];

	// FIXME:styling has no business being here.
	export function createStyle(data) {
		return data.map((item) => ({
			card: {
				horizontal: item.image ? true : false,
				class:
					'm-2 max-w-prose hover:bg-primary-600 hover:text-white dark:hover:bg-primary-700 dark:text-white text-gray-700'
			},
			header: null,
			summary: null
		}));
	}
</script>

<div class="flex flex-col border border-gray-200 md:rounded-t-lg dark:border-gray-700">
	<Breadcrumps data={breadcrumpdata} />
	<div class="grid gap-y-8">
		<GalleryDisplay
			data={milestonedata}
			itemComponent={CardDisplay}
			searchableCol={'header'}
			componentProps={createStyle(milestonedata)}
			withSearch={true}
			header={'Bereichsübersicht'}
		/>
	</div>
</div>
