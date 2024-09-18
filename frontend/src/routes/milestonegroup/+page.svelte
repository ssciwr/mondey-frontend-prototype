<script lang="ts">
	import { base } from '$app/paths';
	import imgJump from '$lib/assets/baby0.jpg';
	import imgHead from '$lib/assets/baby2.jpg';

	import MilestoneGroup from '$lib/components/MilestoneGroup.svelte';
	let breadcrumpdata: any[] = [
		{
			href: `${base}/userLand/userDataInput`,
			label: 'Benutzer'
		},
		{
			href: `${base}/childrengallery`,
			label: 'Kinderübersicht'
		},
		{
			href: '#',
			label: 'Meike'
		},
		{
			href: `${base}/milestonegroup`,
			label: 'Bereichsübersicht'
		}
	];

	// this is a list of data that can be fetched by the component later.
	let milestonedata: any[] = [
		{
			header: 'Grobmotorik',
			summary: 'something something',
			image: imgJump,
			href: `${base}/milestone`,
			progress: 0.75
		},
		{
			header: 'Feinmotorik',
			summary:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt',
			image: null,
			href: `${base}/milestone`,
			progress: 1.0
		},
		{
			header: 'Geistige Grundfunktionen',
			summary: 'something something',
			image: imgHead,
			href: `${base}/milestone`,
			progress: 1.0
		},
		{
			header: 'Höhere Denkfunktionen',
			summary: 'something something',
			image: null,
			href: `${base}/milestone`,
			progress: 1.0
		},
		{
			header: 'Sprache',
			summary: 'how much noise the child makes',
			image: null,
			href: `${base}/milestone`,
			progress: 0.5
		},
		{
			header: 'Soziale Entwicklung',
			summary:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit.',
			image: imgHead,
			href: `${base}/milestone`,
			progress: 0.3
		},
		{
			header: 'Selbstregulation',
			summary: 'something something',
			image: null,
			href: `${base}/milestone`,
			progress: 0.6
		},
		{
			header: 'Emotionen',
			summary: 'something something',
			image: null,
			href: `${base}/milestone`,
			progress: 0.9
		},
		{
			header: 'Vorläuferfertigkeiten Schule',
			summary:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit.',
			image: null,
			href: `${base}/milestone`,
			progress: 0.3
		}
	];
</script>

<div class="flex items-center justify-center">
	<MilestoneGroup {breadcrumpdata} {milestonedata} />
</div>
