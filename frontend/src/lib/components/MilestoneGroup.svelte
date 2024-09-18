<script lang="ts">
	import Breadcrumps from '$lib/components/Breadcrumps.svelte';
	import CardDisplay from '$lib/components/DataDisplay/CardDisplay.svelte';
	import GalleryDisplay from '$lib/components/DataDisplay/GalleryDisplay.svelte';
	export let breadcrumpdata: any[] = [];
	export let milestonedata: any[] = [];

	// FIXME:styling has no business being here... not sure where to put it though given thatparts of it are data dependent
	export function createStyle(data) {
		return data.map((item) => {
			return {
				card: {
					class: 'm-2 max-w-prose dark:text-white text-gray-700 '
				},
				header: null,
				summary: null,
				progress: {
					labelInsideClass: 'h-4 rounded-full text-xs text-center text-white',
					size: 'h-4',
					divClass: `h-full rounded-full w-${100 * item.progress}`,
					color: 'primary',
					completeColor: 'green'
				}
			};
		});
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
