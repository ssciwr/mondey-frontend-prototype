<script lang="ts">
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
	import CardDisplay from '$lib/components/DataDisplay/CardDisplay.svelte';
	import GalleryDisplay from '$lib/components/DataDisplay/GalleryDisplay.svelte';
	export let breadcrumbdata: any[] = [];
	export let milestonedata: any[] = [];

	function filterData(data: object[], dummy: any, key: string): object[] {
		if (key === '') {
			return data;
		} else {
			return data.filter((item) => {
				// button label contains info about completion status => use for search
				if (key === completeKey) {
					return item.progress === 1;
				} else if (key === incompleteKey) {
					return item.progress < 1;
				} else {
					return item.header.toLowerCase().includes(key.toLowerCase());
				}
			});
		}
	}

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

	const completeKey = 'fertig';
	const incompleteKey = 'unfertig';
</script>

<div class="flex flex-col border border-gray-200 md:rounded-t-lg dark:border-gray-700">
	<Breadcrumbs data={breadcrumbdata} />
	<div class="grid gap-y-8">
		<GalleryDisplay
			data={milestonedata.sort((a, b) => a.progress - b.progress)}
			itemComponent={CardDisplay}
			searchableCol={'header'}
			componentProps={createStyle(milestonedata)}
			searchPlaceHolder={`Nach Status (${completeKey}/${incompleteKey}) oder Titel durchsuchen`}
			withSearch={true}
			{filterData}
		/>
	</div>
</div>
