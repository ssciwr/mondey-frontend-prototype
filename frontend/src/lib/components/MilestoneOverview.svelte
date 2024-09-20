<script lang="ts">
	import { base } from '$app/paths';
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
	import CardDisplay from '$lib/components/DataDisplay/CardDisplay.svelte';
	import GalleryDisplay from '$lib/components/DataDisplay/GalleryDisplay.svelte';
	import { CheckCircleSolid, ExclamationCircleSolid } from 'flowbite-svelte-icons';

	function filterData(data: object[], dummy: any, key: string): object[] {
		if (key === '') {
			return data;
		} else {
			return data.filter((item) => {
				// button label contains info about completion status => use for search
				return item.header.toLowerCase().includes(key.toLowerCase());
			});
		}
	}

	// FIXME: this must go eventually. Either must happen in the backend or there
	// should be in a refactored version of the card component
	function convertData(data: object[]): object[] {
		return data.map((item) => {
			return {
				header: item.title,
				href: `${base}/milestone`, // hardcoded link for the moment
				complete: item.answer === null,
				auxilliary: item.answer !== null ? CheckCircleSolid : ExclamationCircleSolid
			};
		});
	}

	export let breadcrumbdata: object[] = [];
	export let data: object[] = [];
	const rawdata = convertData(data); // FIXME: this step should not be here and will be handeled backend-side
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
						class: `${item.complete ? 'text-gray-700 hover:bg-gray-100 hover:bg-green' : 'text-white bg-primary-700 bg-opacity-100 hover:bg-green'}`
					},

					auxilliary: {
						class: 'w-14 h-14 '
					}
				};
			})}
			searchPlaceHolder={'Nach Status (Fertig/Noch nicht bearbeitet) oder Titel durchsuchen'}
			withSearch={true}
			{filterData}
		/>
	</div>
</div>
