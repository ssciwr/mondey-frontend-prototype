<script lang="ts">
	import CardDisplay from '$lib/components/DataDisplay/CardDisplay.svelte';
	import { TabItem, Tabs } from 'flowbite-svelte';
	import {
		AdjustmentsVerticalSolid,
		ArrowUpRightFromSquareSolid,
		GridPlusSolid,
		ProfileCardSolid
	} from 'flowbite-svelte-icons';

	import { activeTabChildren, activeTabPersonal, componentTable } from '$lib/stores/componentStore';
	import { onDestroy } from 'svelte';

	export let userData: any[];
	let windowWidth = 1920;
	let currentPersonal = 'userDataInput';
	let currentChildren = 'childrenGallery';

	// this is used to switch the view to something less cluttery and more easily rendered on small screens
	$: smallScreen = windowWidth < 800;

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

<svelte:window bind:innerWidth={windowWidth} />

<div class="m-2 p-2">
	<Tabs tabStyle="pill">
		<TabItem open={true}>
			<div slot="title" class="flex items-center gap-2 text-lg">
				<ProfileCardSolid size="lg" />
				Persönliche Daten
			</div>
			<svelte:component this={componentTable[currentPersonal]} data={userData} />
		</TabItem>
		{#if smallScreen === false}
			<TabItem>
				<div slot="title" class="flex items-center gap-2 text-lg">
					<GridPlusSolid size="lg" />
					Kinder
				</div>
				<svelte:component this={componentTable[currentChildren]} />
			</TabItem>
			<TabItem>
				<div slot="title" class="flex items-center gap-2 text-lg">
					<AdjustmentsVerticalSolid size="lg" />
					Einstellungen
				</div></TabItem
			>
		{:else}
			<TabItem>
				<div slot="title" class="flex items-center gap-2 text-lg">
					<ArrowUpRightFromSquareSolid size="lg" />
					Mehr
				</div>
				<div class="grid grid-cols-1">
					<CardDisplay
						data={{
							header: 'Kinder',
							href: '/childrengallery'
						}}
						styleProps={{}}
					/>
					<CardDisplay
						data={{
							header: 'Einstellungen'
						}}
						styleProps={{}}
					/>
				</div>
			</TabItem>
		{/if}
	</Tabs>
</div>
