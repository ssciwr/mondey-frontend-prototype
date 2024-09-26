<script lang="ts">
	import { base } from '$app/paths';
	import Breadcrumbs from '$lib/components/Navigation/Breadcrumbs.svelte';
	import CardDisplay from '$lib/components/DataDisplay/CardDisplay.svelte';
	import GalleryDisplay from '$lib/components/DataDisplay/GalleryDisplay.svelte';
	import { CheckCircleSolid, ExclamationCircleSolid } from 'flowbite-svelte-icons';

	// FIXME: this must go eventually. Either must happen in the backend or there
	// should be in a refactored version of the card component
	function convertData(data: object[]): object[] {
		return data.map((item) => {
			return {
				header: item.title,
				href: `${base}/milestone`, // hardcoded link for the moment
				complete: item.answer !== null,
				summary: item.desc,
				answer: item.answer,
				auxilliary: item.answer !== null ? CheckCircleSolid : ExclamationCircleSolid
			};
		});
	}

	export let breadcrumbdata: object[] = [];
	export let searchData: any[];
	export let data: object[] = [];
	const rawdata = convertData(data).sort((a, b) => a.complete - b.complete); // FIXME: the convert step should not be here and will be handeled backend-side
</script>

<div class="mx-auto flex flex-col border border-gray-200 p-4 md:rounded-t-lg dark:border-gray-700">
	<Breadcrumbs data={breadcrumbdata} />
	<div class="grid gap-y-4 p-4">
		<GalleryDisplay
			data={rawdata}
			itemComponent={CardDisplay}
			componentProps={rawdata.map((item) => {
				return {
					card: {
						class: 'text-gray-700 hover:bg-gray-100'
					},

					auxilliary: {
						class: 'w-14 h-14',
						color: item.complete === true ? '#4ade80' : '#EB4F27'
					}
				};
			})}
			withSearch={true}
			{searchData}
		/>
	</div>
</div>
