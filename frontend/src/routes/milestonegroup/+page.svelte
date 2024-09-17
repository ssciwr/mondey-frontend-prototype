<script lang="ts">
	import { base } from '$app/paths';
	import MilestoneGroup from '$lib/components/MilestoneGroup.svelte';

	let breadcrumpdata: any[] = [
		{
			href: `${base}/childrengallery/`,
			label: 'Übersicht'
		},
		{
			href: '#',
			label: 'Meike'
		},
		{
			href: '#',
			label: 'Bereichsübersicht'
		}
	];

	let milestonedata: any[] = [
		{
			header: 'Grobmotorik',
			summary: 'something something',
			image: null,
			href: `{$_("milestone.milestones")}`,
			progress: 0.75
		},
		{
			header: 'Feinmotorik',
			summary: 'something something',
			image: null,
			href: `{$_("milestone.milestones")}`,
			progress: 1.0
		},
		{
			header: 'Geistige Grundfunktionen',
			summary: 'something something',
			image: null,
			href: `{$_("milestone.milestones")}`,
			progress: 1.0
		},
		{
			header: 'Höhere Denkfunktionen',
			summary: 'something something',
			image: null,
			href: `{$_("milestone.milestones")}`,
			progress: 1.0
		},
		{
			header: 'Sprache',
			summary: 'how much noise the child makes',
			image: null,
			href: `{$_("milestone.milestones")}`,
			progress: 0.5
		},
		{
			header: 'Soziale Entwicklung',
			summary: 'something something',
			image: null,
			href: `{$_("milestone.milestones")}`,
			progress: 0.3
		},
		{
			header: 'Selbstregulation',
			summary: 'something something',
			image: null,
			href: `{$_("milestone.milestones")}`,
			progress: 0.6
		},
		{
			header: 'Emotionen',
			summary: 'something something',
			image: null,
			href: `{$_("milestone.milestones")}`,
			progress: 0.9
		},
		{
			header: 'Vorläuferfertigkeiten Schule',
			summary: 'something something',
			image: null,
			href: `{$_("milestone.milestones")}`,
			progress: 0.3
		}
	];
</script>

<div class="flex items-center justify-center">
	<MilestoneGroup {breadcrumpdata} {milestonedata} />
</div>
