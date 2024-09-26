<script>
	import { base } from '$app/paths';
	import Childrenpage from '$lib/components/Childrenpage.svelte';
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

<Childrenpage {breadcrumbdata} />
