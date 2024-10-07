<script lang="ts">
	import { isLoggedIn } from '$lib/stores/adminStore';
	import { updateLanguages } from '$lib/i18n';
	import Languages from '$lib/components/Admin/Languages.svelte';
	import MilestoneGroups from '$lib/components/Admin/MilestoneGroups.svelte';
	import Questions from '$lib/components/Admin/UserQuestions.svelte';
	import Login from '$lib/components/Admin/Login.svelte';
	import { _ } from 'svelte-i18n';
	import { onMount } from 'svelte';
	import { Tabs, TabItem } from 'flowbite-svelte';
	import { LanguageOutline, BadgeCheckOutline, ClipboardListOutline } from 'flowbite-svelte-icons';

	async function updateIsLoggedIn() {
		const res = await fetch(`${import.meta.env.VITE_MONDEY_API_URL}/users/me`, {
			method: 'GET',
			credentials: 'include'
		});
		if (res.status === 200) {
			const user = await res.json();
			if (user.is_superuser) {
				isLoggedIn.set(true);
			}
		}
	}

	onMount(async () => {
		console.log(import.meta.env.VITE_MONDEY_API_URL);
		updateLanguages();
		updateIsLoggedIn();
	});
</script>

{#if !$isLoggedIn}
	<div class="flex w-full flex-col items-center justify-center">
		<Login />
	</div>
{:else}
	<Tabs tabStyle="underline">
		<TabItem open>
			<div slot="title" class="flex items-center gap-2">
				<BadgeCheckOutline size="md" />
				{$_('admin.milestones')}
			</div>
			<MilestoneGroups />
		</TabItem>
		<TabItem>
			<div slot="title" class="flex items-center gap-2">
				<ClipboardListOutline size="md" />
				{$_('admin.user-questions')}
			</div>
			<Questions />
		</TabItem>
		<TabItem>
			<div slot="title" class="flex items-center gap-2">
				<LanguageOutline size="md" />
				{$_('admin.languages')}
			</div>
			<Languages />
		</TabItem>
	</Tabs>
{/if}
