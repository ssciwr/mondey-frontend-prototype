<script lang="ts">
	import { base } from '$app/paths';
	import { users } from '$lib/stores/userStore';
	import { Button, Heading, Popover } from 'flowbite-svelte';
	import { onDestroy } from 'svelte';

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
		<div class="mx-auto flex flex-col items-center justify-center">
			<p class="m-2 w-full rounded-lg border p-2 text-lg font-semibold">{userData.name}</p>
			<Button href={base} on:click={logout} size="lg">Logout</Button>
		</div>
	{:else}
		<div class="mx-auto mb-6 flex flex-col items-center justify-center space-y-6">
			<Heading tag="h3">Willkommen!</Heading>
			<Button href="{base}/userLand/userLogin">Einloggen oder Registrieren</Button>
		</div>
	{/if}
</Popover>
