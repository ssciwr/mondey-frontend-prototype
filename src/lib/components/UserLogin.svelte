<script>
	import AbstractRegistrationForm from '$lib/components/DataInput/AbstractRegistrationForm.svelte';
	import { createDummyUser } from '$lib/stores/userStore';
	import { Input } from 'flowbite-svelte';
	import { onMount } from 'svelte';
	import UserLoginUtil from './UserLoginUtil.svelte';

	export let role = 'user';

	let data = [
		{
			itemComponent: Input,
			componentProps: {
				type: 'text',
				name: 'Benutzerkennung',
				placeholder: 'Benutzerkennung',
				label: 'Benutzerkennung',
				value: '',
				required: true
			}
		},
		{
			itemComponent: Input,
			componentProps: {
				type: 'password',
				name: 'Passwort',
				placeholder: 'Passwort',
				label: 'Passwort',
				value: '',
				required: true
			}
		},
		{
			itemComponent: UserLoginUtil,
			componentProps: {}
		}
	];

	$: if (role === 'admin') {
		data.push({
			itemComponent: Input,
			componentProps: {
				type: 'text',
				name: 'Projektcode',
				placeholder: 'Projektcode',
				label: 'Projektcode',
				value: '',
				required: true
			}
		});
	}

	const buttons = [
		{
			label: 'Login',
			href: '/'
		}
	];

	onMount(async () => {
		createDummyUser();
	});
</script>

<div class="container m-1 mx-auto w-full max-w-md space-y-6">
	<AbstractRegistrationForm heading={'Einloggen'} {buttons} props={data} />
	<span class="text-gray-700 dark:text-gray-400">Not registered?</span>
	<a
		href="/userLand/userRegistration"
		class="text-primary-700 hover:underline dark:text-primary-500"
	>
		Create account
	</a>
</div>
