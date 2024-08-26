<script>
	import AbstractRegistrationForm from '$lib/components/DataInput/AbstractRegistrationForm.svelte';
	import { Input } from 'flowbite-svelte';

	const default_data = [
		{
			itemComponent: Input,
			componentData: {
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
			componentData: {
				type: 'password',
				name: 'Passwort',
				placeholder: 'Passwort',
				label: 'Passwort',
				value: '',
				required: true
			}
		}
	];

	export let data = default_data;

	export let role = 'user';

	if (role === 'admin') {
		data.push({
			itemComponent: Input,
			componentData: {
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

<div>
	<AbstractRegistrationForm
		props={data}
		heading={'Login'}
		{buttons}
		href={'/userLand/userDataInput'}
	/>
</div>
