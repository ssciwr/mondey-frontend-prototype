<script context="module">
	export function convertData(rawdata) {
		let data = rawdata.map((item) => {
			return {
				header: item.name,
				summary: item.info,
				image: item.image,
				href: `/childLand/${item.user}/${item.id}`
			};
		});

		// put in new element at the front which adds new child
		data.unshift({
			header: 'Neu',
			summary: 'Ein neues Kind anmelden',
			href: '/childLand/childDataInput'
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
					: { horizontal: item.image ? true : false },
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
	import CardDisplay from '$lib/components/DataDisplay/CardDisplay.svelte';
	import GalleryDisplay from '$lib/components/DataDisplay/GalleryDisplay.svelte';
	import { fetchChildrenDataforUser, load, save, type ChildData } from '$lib/stores/childrenStore';
	import { Heading } from 'flowbite-svelte';
	import { onDestroy, onMount } from 'svelte';
	// create data and

	async function init() {
		loading = true;
		try {
			await load();
		} catch (error) {
			console.log('Error loading data: ', error);
		}

		// Update the store with the value from localStorage
		let rawdata: unknown = [];

		try {
			rawdata = await fetchChildrenDataforUser('dummyUser');
		} catch (error) {
			console.log('some error occured: ', error);
		}
		data = convertData(rawdata);
		loading = false;
	}

	let data: ChildData[] = [];
	let loading = true;

	// this fetches dummy child data for the dummy user whenever the component is mounted into the dom
	// it is conceptualized as emulating an API call that would normally fetch this from the server.
	onMount(init);
	onDestroy(async () => {
		save();
	});
</script>

<Heading tag="h1" class="mb-2" color="text-gray-700 dark:text-gray-400">Übersicht</Heading>

<div class="cols-1 grid gap-y-8">
	{#if loading}
		<p>Daten werden geladen...</p>
	{:else}
		<p class="text-lg text-gray-700 dark:text-gray-400">
			Wählen sie ein Kind zur Beobachtung aus oder legen melden sie ein neues Kind an.
		</p>
		<GalleryDisplay
			{data}
			itemComponent={CardDisplay}
			searchableCol={'header'}
			componentProps={createStyle(data)}
		/>
	{/if}
</div>
