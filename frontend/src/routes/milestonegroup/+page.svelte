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
			href: `{$_("milestone.milestones")}`
		},
		{
			header: 'Feinmotorik',
			summary: 'something something',
			image: null,
			href: `{$_("milestone.milestones")}`
		},
		{
			header: 'Geistige Grundfunktionen',
			summary: 'something something',
			image: null,
			href: `{$_("milestone.milestones")}`
		},
		{
			header: 'Höhere Denkfuntkionen',
			summary: 'something something',
			image: null,
			href: `{$_("milestone.milestones")}`
		},
		{
			header: 'Sprache',
			summary: 'how much noise the child makes',
			image: null,
			href: `{$_("milestone.milestones")}`
		}
	];

	export let heading = '';
</script>

<div class="flex items-center justify-center">
	<MilestoneGroup {breadcrumpdata} {milestonedata} />
</div>
