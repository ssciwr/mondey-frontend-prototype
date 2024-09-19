<script lang="ts">
	import Childrenpage from '$lib/components/Childrenpage.svelte';
	import UserDataInput from '$lib/components/UserDataInput.svelte';
	import { users } from '$lib/stores/userStore';
	import { TabItem, Tabs } from 'flowbite-svelte';
	import {
		AdjustmentsVerticalSolid,
		GridPlusSolid,
		HomeSolid,
		ProfileCardSolid
	} from 'flowbite-svelte-icons';

	import { onDestroy, onMount } from 'svelte';
	// subscribe to stores to make sure we notice when something new happens
	const unsubscribe = users.subscribe(() => {
		users.save();
	});
	onMount(async () => {
		await users.load();
	});

	onDestroy(() => {
		unsubscribe();
	});
</script>

<div>
	<Tabs tabStyle="underline">
		<TabItem open>
			<div slot="title" class="flex items-center gap-2 text-lg">
				<HomeSolid size="lg" />
				Home
			</div>
		</TabItem>
		<TabItem>
			<div slot="title" class="flex items-center gap-2 text-lg">
				<ProfileCardSolid size="lg" />
				Persönliche Daten
			</div>
			<UserDataInput />
		</TabItem>
		<TabItem>
			<div slot="title" class="flex items-center gap-2 text-lg">
				<GridPlusSolid size="lg" />
				Kinder
			</div>
			<Childrenpage />
		</TabItem>
		<TabItem>
			<div slot="title" class="flex items-center gap-2 text-lg">
				<AdjustmentsVerticalSolid size="lg" />
				Einstellungen
			</div></TabItem
		>
	</Tabs>
</div>
