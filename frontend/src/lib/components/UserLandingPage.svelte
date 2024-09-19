<script lang="ts">
	import { users } from '$lib/stores/userStore';
	import { TabItem, Tabs } from 'flowbite-svelte';
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
		<TabItem open title="Home"></TabItem>
		<TabItem open title="Persönliche Daten"></TabItem>
		<TabItem open title="Kinder"></TabItem>
		<TabItem open title="Einstellungen"></TabItem>
	</Tabs>
</div>
