<script lang="ts">
	import { goto } from '$app/navigation';
	import UserLoginUtil from '$lib/components//UserLoginUtil.svelte';
	import AlertMessage from '$lib/components/AlertMessage.svelte';
	import Input from '$lib/components/DataInput/Input.svelte';
	import NavigationButtons from '$lib/components/Navigation/NavigationButtons.svelte';
	import { createDummyUser, users, type UserData } from '$lib/stores/userStore';
	import { Card, Heading } from 'flowbite-svelte';
	import { onMount } from 'svelte';

	// functionality

	/**
	 * This currently immitates the behavior of a login system by fetching data from
	 * the userstore that has been precreated. What fetchWithCredentials does currently will later go into the backend
	 */
	async function validateCredentials() {
		const user = await users.fetchWithCredentials(credentials[uid], credentials[pid]);

		if (!user) {
			showAlert = true;
		} else {
			userID = user.id;
			if (remember) {
				localStorage.setItem('currentUser', JSON.stringify(userID));
			} else {
				localStorage.removeItem('currentUser');
			}
			goto('/childrengallery/');
		}
	}

	// data and variables
	let data = [
		{
			type: 'text',
			name: 'Benutzerkennung',
			placeholder: 'Benutzerkennung',
			label: 'Benutzerkennung',
			required: true
		},
		{
			type: 'password',
			name: 'Passwort',
			placeholder: 'Passwort',
			label: 'Passwort',
			required: true
		}
	];

	const buttons = [
		{
			label: 'Login',
			href: null
		}
	];

	const uid = 0;
	const pid = 1;

	let userID: string;
	$: credentials = ['', ''];
	let remember: boolean = false;
	let showAlert: boolean = false;
	const heading = 'Einloggen';

	// check if credentials are stored
	onMount(async () => {
		// make dummyUser if not already there
		if (!users.get()['dummyUser123']) {
			createDummyUser();
		}

		// check if credentials are saved
		const savedUID = JSON.parse(localStorage.getItem('currentUser'));

		if (savedUID) {
			userID = savedUID;

			const user: UserData = (await users.fetch(userID)) as UserData;
			credentials = [user.name, user.password];
			remember = true;
		}
	});
</script>

{#if showAlert}
	<AlertMessage
		title={'Fehler'}
		message={'Benutzerkennung oder Passwort sind falsch'}
		lastpage="/userLand/userLogin"
		onclick={() => {
			showAlert = false;
		}}
	/>
{/if}

<div class="container m-1 mx-auto w-full max-w-xl">
	<Card class="container m-1 mx-auto mb-6 w-full max-w-xl pb-6">
		{#if heading}
			<Heading
				tag="h3"
				class="m-1 mb-3 p-1 text-center font-bold tracking-tight text-gray-700 dark:text-gray-400"
				>{heading}</Heading
			>
		{/if}

		<form class="m-1 m-3 mx-auto w-full flex-col space-y-6">
			{#each data as element, i}
				<Input {element} bind:value={credentials[i]} />
			{/each}
		</form>

		<UserLoginUtil cls="p-6 mb-3" bind:checked={remember} />

		<NavigationButtons {buttons} onclick={validateCredentials} />
	</Card>

	<span class="container mx-auto w-full text-gray-700 dark:text-gray-400">Not registered?</span>
	<a
		href="/userLand/userRegistration"
		class="text-primary-700 hover:underline dark:text-primary-500"
	>
		Create account
	</a>
</div>
