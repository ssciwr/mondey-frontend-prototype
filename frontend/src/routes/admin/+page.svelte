<script lang="ts">
	import { onMount } from 'svelte';
	import { isLoggedIn } from '$lib/stores/adminStore';
	import MilestoneGroup from '$lib/components/Admin/MilestoneGroup.svelte';
	import MilestoneGroups from '$lib/components/Admin/MilestoneGroups.svelte';
	import Login from '$lib/components/Admin/Login.svelte';

	async function updateIsLoggedIn() {
		const res = await fetch(`${import.meta.env.VITE_MONDEY_API_URL}/users/me`, {
			method: 'GET',
			credentials: 'include'
		});
		if (res.status === 200) {
			isLoggedIn.set(true);
		}
	}

	onMount(() => {
		updateIsLoggedIn();
	});

	let isLoggedInValue: boolean;
	const unsubscribe = isLoggedIn.subscribe((value) => {
		isLoggedInValue = value;
	});
</script>

<div class="flex w-full flex-col items-center justify-center">
	{#if !isLoggedInValue}
		<Login />
	{:else}
		<MilestoneGroups />
		<MilestoneGroup />
	{/if}
</div>
