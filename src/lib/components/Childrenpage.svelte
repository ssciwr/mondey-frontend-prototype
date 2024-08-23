<script>
	import CardDisplay from '$lib/components/DataDisplay/CardDisplay.svelte';
	import GalleryDisplay from '$lib/components/DataDisplay/GalleryDisplay.svelte';
	import { Button, Heading } from 'flowbite-svelte';
	import { PlusOutline } from 'flowbite-svelte-icons';
	import AbstractContent from './AbstractContent.svelte';
	const cardProps = {
		horizontal: true
	};

	export function generateData() {
		return [
			{
				name: 'A',
				tag: 'cohort1',
				image: 'children.png',
				info: 'A child that is making a mess and is doing good. Click to view more.'
			},
			{
				name: 'B',
				tag: 'cohort1',
				image: 'children.png',
				info: 'A child that is making a mess and is doing good. Click to view more.'
			},
			{
				name: 'C',
				tag: 'cohort2',
				image: '/children.png',
				info: 'A child that is making a mess and is doing good. Click to view more.'
			},
			{
				name: 'D',
				tag: 'cohort1',
				image: '/children.png',
				info: 'A child that is making a mess and is doing good. Click to view more.'
			},
			{
				name: 'E',
				tag: 'cohort1',
				image: 'children.png',
				info: 'A child that is making a mess and is doing good. Click to view more.'
			},
			{
				name: 'F',
				tag: 'cohort2',
				image: 'children.png',
				info: 'A child that is making a mess and is doing good. Click to view more.'
			}
		];
	}

	export function convertData(data) {
		return data.map((item) => {
			return {
				header: item.name,
				summary: item.info,
				image: item.image,
				link: '/'
			};
		});
	}

	const data = convertData(generateData());
</script>

<AbstractContent showNavIcons={false} iconProps={{ class: 'w-10 h-10' }}>
	<Heading tag="h1" class="mb-2" color="text-gray-700 dark:text-gray-400">Übersicht</Heading>

	<div class="cols-1 grid gap-y-8">
		<p class="text-lg text-gray-700 dark:text-gray-400">
			Wählen sie ein Kind zur Beobachtung aus oder legen melden sie ein neues Kind an.
		</p>

		<div>
			<Button class="m-2" href="/"><PlusOutline class="h-24 w-24" /></Button>
		</div>

		<GalleryDisplay {data} itemComponent={CardDisplay} componentProps={cardProps} />
	</div>
</AbstractContent>
