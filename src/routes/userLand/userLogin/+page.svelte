<script>
	import AbstractRegistrationForm from '$lib/components/DataInput/AbstractRegistrationForm.svelte';
	import { Input } from 'flowbite-svelte';

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
</script>

<div class="container m-1 mx-auto w-full max-w-md">
	<AbstractRegistrationForm heading={'Einloggen'} {buttons} props={data} />
</div>
