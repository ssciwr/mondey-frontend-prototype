<script lang="ts">
	import { base } from '$app/paths';
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
	import CardDisplay from '$lib/components/DataDisplay/CardDisplay.svelte';
	import GalleryDisplay from '$lib/components/DataDisplay/GalleryDisplay.svelte';
	import { CheckCircleSolid, ExclamationCircleSolid } from 'flowbite-svelte-icons';

	import { Heading, Progressbar, Search } from 'flowbite-svelte';

	function filterData(data: object[], key: string): object[] {
		if (key === '') {
			return data;
		} else {
			return data.filter((item) => {
				// button label contains info about completion status => use for search
				return item.header.includes(key) || item.button.includes(key);
			});
		}
	}

	function sortData(data: object[]): object[] {
		return data;
	}

	// FIXME: this must go eventually. Either must happen in the backend or there
	// should be some other way to deal with it
	function convertData(data: object[]): object[] {
		return data.map((item) => {
			return {
				header: item.title,
				summary: item.desc,
				href: `${base}/milestone`, // hardcoded link for the moment
				button: item.answer !== null ? 'Fertig' : 'Noch nicht beantwortet',
				buttonIcon: item.answer !== null ? CheckCircleSolid : ExclamationCircleSolid
			};
		});
	}

	export let breadcrumbdata: object[] = [];
	export let data: object[] = [];
	export let searchTerm: string = '';
	export let progress: number;
	export let title: string;
	export let desc: string;

	const rawdata = convertData(data); // FIXME: this step should not be here
	$: filteredItems = sortData(filterData(rawdata, searchTerm));
</script>

<div class="flex flex-col border border-gray-200 md:rounded-t-lg dark:border-gray-700">
	<Breadcrumbs data={breadcrumbdata} />
	<div class="grid gap-y-8 p-4">
		<Heading
			tag="h1"
			class="m-1 mb-3 p-1 px-6 font-bold tracking-tight text-gray-700 dark:text-white"
			>{title}</Heading
		>
		<p class="px-6 text-gray-700 dark:text-white">{desc}</p>
		<div class="px-6">
			<Progressbar
				labelInsideClass="h-6 rounded-full text-md text-center text-white"
				size="h-6"
				divClass={`h-full rounded-full w-${100 * progress}`}
				labelInside
				color={progress === 1 ? 'green' : 'primary'}
				progress={String(100 * progress)}
				animate={true}
			/>
		</div>
		<div class="px-6">
			<Search
				size="md"
				placeholder={'Nach Status oder Titel durchsuchen'}
				bind:value={searchTerm}
			/>
		</div>

		<GalleryDisplay
			data={filteredItems}
			itemComponent={CardDisplay}
			componentProps={filteredItems.map((item) => {
				return {
					card: {
						class: 'm-2 max-w-prose dark:text-white text-gray-700 '
					},
					button: {
						color: item.button === 'Fertig' ? 'green' : 'primary'
					}
				};
			})}
			withSearch={false}
		/>
	</div>
</div>
