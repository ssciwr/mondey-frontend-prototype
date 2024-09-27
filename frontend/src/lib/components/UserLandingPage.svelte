<script lang="ts">
	import { TabItem, Tabs } from 'flowbite-svelte';
	import { GridPlusSolid, ProfileCardSolid } from 'flowbite-svelte-icons';

	import { activeTabChildren, activeTabPersonal, componentTable } from '$lib/stores/componentStore';
	import { onDestroy } from 'svelte';

	export let userData: any[];
	let currentPersonal = 'userDataInput';
	let currentChildren = 'childrenGallery';

	const unsubscribePersonal = activeTabPersonal.subscribe((value) => {
		console.log('personal tab: ', value);
		currentPersonal = value;
	});

	const unsubscribeChildren = activeTabChildren.subscribe((value) => {
		console.log('children tab: ', value);
		currentChildren = value;
	});

	onDestroy(() => {
		unsubscribeChildren();
		unsubscribePersonal();
	});
</script>

<div class="m-2 p-2">
	<Tabs tabStyle="pill">
		<TabItem open={true}>
			<div slot="title" class="flex items-center gap-2 text-lg">
				<ProfileCardSolid size="lg" />
				Persönliche Daten
			</div>
			<svelte:component this={componentTable[currentPersonal]} data={userData} />
		</TabItem>
		<TabItem>
			<div slot="title" class="flex items-center gap-2 text-lg">
				<GridPlusSolid size="lg" />
				Kinder
			</div>
			<svelte:component this={componentTable[currentChildren]} />
		</TabItem>
	</Tabs>
</div>
