<script>
	import Input from '$lib/components/DataInput/Input.svelte';
	import { Card, Heading } from 'flowbite-svelte';
	import UserLoginUtil from './UserLoginUtil.svelte';

	let data = [
		{
			type: 'text',
			name: 'Benutzerkennung',
			placeholder: 'Benutzerkennung',
			label: 'Benutzerkennung',
			value: '',
			required: true
		},
		{
			type: 'password',
			name: 'Passwort',
			placeholder: 'Passwort',
			label: 'Passwort',
			value: '',
			required: true
		}
	];

	const buttons = [
		{
			label: 'Login',
			href: '/'
		}
	];

	const heading = 'Einloggen';
</script>

<Card class="container m-1 mx-auto w-full max-w-xl">
	{#if heading}
		<Heading
			tag="h3"
			class="m-1 mb-3 p-1 text-center font-bold tracking-tight text-gray-700 dark:text-gray-400"
			>{heading}</Heading
		>
	{/if}

	<form class="m-1 m-3 mx-auto w-full flex-col space-y-6">
		{#each data as element, i}
			<Input {element} />
		{/each}
	</form>

	<UserLoginUtil cls="p-6 mb-3" />

	<span class="container mx-auto w-full text-gray-700 dark:text-gray-400">Not registered?</span>
	<a
		href="/userLand/userRegistration"
		class="text-primary-700 hover:underline dark:text-primary-500"
	>
		Create account
	</a>
</Card>
