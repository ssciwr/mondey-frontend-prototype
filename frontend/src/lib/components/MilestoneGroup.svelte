<script lang="ts">
	import Breadcrumps from '$lib/components/Breadcrumps.svelte';
	import CardDisplay from '$lib/components/DataDisplay/CardDisplay.svelte';
	import GalleryDisplay from '$lib/components/DataDisplay/GalleryDisplay.svelte';
	export let breadcrumpdata: any[] = [];
	export let milestonedata: any[] = [];

	// FIXME:styling has no business being here.
	export function createStyle(data) {
		return data.map((item) => ({
			card: { horizontal: item.image ? true : false },
			header: null,
			summary: null
		}));
	}
</script>

<div class="flex flex-col border-gray-100 md:rounded-t-lg dark:bg-gray-600">
	<Breadcrumps data={breadcrumpdata} />
	<p class="text-lg text-gray-700 dark:text-gray-400">
		Wählen sie ein Kind zur Beobachtung aus oder legen melden sie ein neues Kind an.
	</p>
	<div class="grid gap-y-8">
		<GalleryDisplay
			data={milestonedata}
			itemComponent={CardDisplay}
			searchableCol={'header'}
			componentProps={createStyle(milestonedata)}
			withSearch={true}
		/>
	</div>
</div>
