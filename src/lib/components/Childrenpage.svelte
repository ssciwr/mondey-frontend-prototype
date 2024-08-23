<script context="module">
	export function convertData(rawdata) {
		let data = rawdata.map((item) => {
			return {
				header: item.name,
				summary: item.info,
				image: item.image,
				href: item.href ? item.href : '/'
			};
		});

		// put in new element at the front which adds new child
		data.unshift({
			header: 'Neu',
			summary: 'Ein neues Kind anmelden',
			href: '/'
		});
		return data;
	}

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
							class: 'mb-3 flex font-normal leading-tight text-white dark:text-gray-400'
						}
					: null,
			button: null
		}));
	}
</script>

<script>
	import CardDisplay from '$lib/components/DataDisplay/CardDisplay.svelte';
	import GalleryDisplay from '$lib/components/DataDisplay/GalleryDisplay.svelte';
	import { Heading } from 'flowbite-svelte';
	import AbstractContent from './AbstractContent.svelte';

	const rawdata = [
		{
			name: 'Anna',
			info: 'A child that is making a mess and is doing good. Click to view more.',
			href: '/surveyfeedback'
		},
		{
			name: 'Ben',
			image: 'children.png',
			info: 'A child that is making a mess and is doing good. Click to view more.',
			href: '/surveyfeedback'
		},
		{
			name: 'C',
			info: 'A child that is making a mess and is doing good. Click to view more.',
			href: '/surveyfeedback'
		},
		{
			name: 'Dora',
			image: '/children.png',
			info: 'A child that is making a mess and is doing good. Click to view more.',
			href: '/surveyfeedback'
		},
		{
			name: 'E',
			image: 'children.png',
			info: 'A child that is making a mess and is doing good. Click to view more.',
			href: '/surveyfeedback'
		},
		{
			name: 'F',
			image: 'children.png',
			info: 'A child that is making a mess and is doing good. Click to view more.',
			href: '/surveyfeedback'
		}
	];

	const data = convertData(rawdata);
</script>

<AbstractContent showNavIcons={false} iconProps={{ class: 'w-10 h-10' }}>
	<Heading tag="h1" class="mb-2" color="text-gray-700 dark:text-gray-400">Übersicht</Heading>

	<div class="cols-1 grid gap-y-8">
		<p class="text-lg text-gray-700 dark:text-gray-400">
			Wählen sie ein Kind zur Beobachtung aus oder legen melden sie ein neues Kind an.
		</p>
		<GalleryDisplay
			{data}
			itemComponent={CardDisplay}
			searchableCol={'header'}
			componentProps={createStyle(data)}
		/>
	</div>
</AbstractContent>
