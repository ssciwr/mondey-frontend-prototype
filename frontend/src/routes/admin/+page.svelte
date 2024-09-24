<script lang="ts">
	import { isLoggedIn } from '$lib/stores/adminStore';
	import { updateLanguages } from '$lib/i18n';
	import Languages from '$lib/components/Admin/Languages.svelte';
	import MilestoneGroups from '$lib/components/Admin/MilestoneGroups.svelte';
	import Login from '$lib/components/Admin/Login.svelte';
	import { onMount } from 'svelte';

	async function updateIsLoggedIn() {
		const res = await fetch(`${import.meta.env.VITE_MONDEY_API_URL}/users/me`, {
			method: 'GET',
			credentials: 'include'
		});
		if (res.status === 200) {
			isLoggedIn.set(true);
		}
	}

	onMount(async () => {
		updateLanguages();
		updateIsLoggedIn();
	});
</script>

<div class="flex w-full flex-col items-center justify-center">
	{#if !$isLoggedIn}
		<Login />
	{:else}
		<Languages />
		<MilestoneGroups />
	{/if}
</div>
