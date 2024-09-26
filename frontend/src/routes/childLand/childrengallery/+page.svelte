<script>
	import { base } from '$app/paths';
	import ChildrenGallery from '$lib/components/ChildrenGallery.svelte';
	const breadcrumbdata = [
		{
			href: `${base}/userLand/userLandingpage`,
			label: 'Benutzer'
		},
		{
			href: `${base}/userLand/userLandingpage`,
			label: 'Kinderübersicht'
		}
	];
</script>

<ChildrenGallery {breadcrumbdata} />
