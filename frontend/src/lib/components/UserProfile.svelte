<script lang="ts">
	import { users } from '$lib/stores/userStore';
	import { Button, Heading, Listgroup, Popover } from 'flowbite-svelte';
	import { onDestroy } from 'svelte';
	import {base} from "$app/paths";

	export let triggeredBy = '';
	let loggedIn: string | null = users.get()['loggedIn'];
	let userData: UserData | null = loggedIn ? users.fetch(loggedIn) : null;

	const unsubscribe = users.subscribe((currentUserData) => {
		loggedIn = currentUserData['loggedIn'];

		if (loggedIn && loggedIn !== null) {
			userData = users.fetch(loggedIn);
		}
	});

	function logout() {
		users.get()['loggedIn'] = null;
		userData = null;
	}

	onDestroy(unsubscribe);
</script>

<Popover {triggeredBy} class="text-gray-700 dark:text-gray-400">
	{#if userData !== null}
		<div class="mx-auto mb-6 flex flex-col items-center justify-center space-y-6">
			<Listgroup
				active
				items={[
					{ name: 'Übersicht', href: `${base}/childrengallery`, current: true },
					{ name: 'Profil', href: `${base}/userLand/userDataInput` }
				]}
				let:item
			>
				{item.name}
			</Listgroup>
			<Button href="{base}" on:click={logout}>Logout</Button>
		</div>
	{:else}
		<div class="mx-auto mb-6 flex flex-col items-center justify-center space-y-6">
			<Heading tag="h3">Willkommen!</Heading>
			<Button href="{base}/userLand/userLogin">Einloggen oder Registrieren</Button>
		</div>
	{/if}
</Popover>
