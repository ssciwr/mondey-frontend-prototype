<script>
	import AbstractContent from '$lib/components/AbstractContent.svelte';
	import Frontpage from '$lib/components/Frontpage.svelte';
</script>

<AbstractContent showBottomNavbar={false}>
	<Frontpage getStarted={'/firstdropdown'} />
</AbstractContent>
