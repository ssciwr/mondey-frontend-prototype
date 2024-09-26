<script context="module">
	import { base } from '$app/paths';
	export function convertData(rawdata) {
		let data = rawdata.map((item) => {
			return {
				header: item.name,
				summary: item.info,
				image: item.image,
				href: `${base}/childLand/${item.user}/${item.id}`
			};
		});

		// put in new element at the front which adds new child
		data.unshift({
			header: 'Neu',
			summary: 'Ein neues Kind anmelden',
			href: `${base}/childLand/childDataInput`
		});
		return data;
	}

	// dynamically create the styles for individual gallery tiles based on the data.
	// The 'Neu' element needs to be styled differently in particular
	// FIXME: this needs to go. styles have no business being defined in <script>
	export function createStyle(data) {
		return data.map((item) => ({
			card:
				item.header === 'Neu'
					? {
							class:
								'm-2 max-w-prose bg-primary-700 dark:bg-primary-600 hover:bg-primary-800 dark:hover:bg-primary-700',
							horizontal: false
						}
					: { horizontal: false },
			header:
				item.header == 'Neu'
					? {
							class: 'mb-2 text-2xl font-bold tracking-tight text-white dark:text-white'
						}
					: null,
			summary:
				item.header == 'Neu'
					? {
							class: 'mb-3 flex font-normal leading-tight text-white dark:text-white'
						}
					: null,
			button: null
		}));
	}
</script>

<script lang="ts">
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
	import CardDisplay from '$lib/components/DataDisplay/CardDisplay.svelte';
	import GalleryDisplay from '$lib/components/DataDisplay/GalleryDisplay.svelte';
	import { children, type ChildData } from '$lib/stores/childrenStore';
	import { users } from '$lib/stores/userStore';
	import { Heading } from 'flowbite-svelte';
	import { onDestroy, onMount } from 'svelte';
	// create data and

	async function init() {
		loading = true;
		users.load();
		try {
			await children.load();
		} catch (error) {
			console.log('Error loading data: ', error);
		}

		const loggedIn = users.get()['loggedIn'];

		// Update the store with the value from localStorage
		let rawdata: unknown = [];

		try {
			rawdata = await children.fetchChildrenDataforUser(loggedIn);
		} catch (error) {
			console.log('some error occured: ', error);
		}
		data = convertData(rawdata);
		loading = false;
	}

	let data: ChildData[] = [];
	export let breadcrumbdata: any[];
	let loading = true;

	function searchName(data: any[], key: string): any[] {
		if (key === '') {
			return data;
		} else {
			const res = data.filter((item) => {
				return item.header.toLowerCase().includes(key.toLowerCase());
			});
			return res;
		}
	}

	function searchRemarks(data: any[], key: string): any[] {
		if (key === '') {
			return data;
		} else {
			const res = data.filter((item) => {
				return item.summary.toLowerCase().includes(key.toLowerCase());
			});
			return res;
		}
	}

	function searchAll(data: any[], key: string) {
		return [...new Set([...searchName(data, key), ...searchRemarks(data, key)])];
	}

	const searchData = [
		{
			label: 'Alle',
			placeholder: 'Alle Kategorien durchsuchen',
			filterFunction: searchAll
		},
		{
			label: 'Name',
			placeholder: 'Kinder nach Namen durchsuchen',
			filterFunction: searchName
		},
		{
			label: 'Bemerkung',
			placeholder: 'Bemerkungen zu Kindern durchsuchen',
			filterFunction: searchRemarks
		}
	];

	// this fetches dummy child data for the dummy user whenever the component is mounted into the dom
	// it is conceptualized as emulating an API call that would normally fetch this from the server.
	onMount(init);
	onDestroy(async () => {
		children.save();
	});
</script>

<div class="container m-2 mx-auto w-full pb-4 md:rounded-t-lg">
	{#if breadcrumbdata}
		<Breadcrumbs data={breadcrumbdata} />
	{/if}

	<Heading tag="h1" class="m-2 mb-2 p-4 " color="text-gray-700 dark:text-gray-400"
		>Übersicht</Heading
	>

	<div class="cols-1 grid w-full gap-y-8 p-2">
		{#if loading}
			<p>Daten werden geladen...</p>
		{:else}
			<p class="w-auto p-2 text-lg text-gray-700 dark:text-gray-400">
				Wählen sie ein Kind zur Beobachtung aus oder legen melden sie ein neues Kind an.
			</p>
			<GalleryDisplay
				{data}
				itemComponent={CardDisplay}
				componentProps={createStyle(data)}
				{searchData}
			/>
		{/if}
	</div>
</div>
