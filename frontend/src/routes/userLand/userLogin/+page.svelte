<script>
	import UserLogin from '$lib/components/UserLogin.svelte';
	import { Input, Select } from 'flowbite-svelte';

	const data = [
		{
			component: Input,
			value: null,
			props: {
				label: 'Benutzerkennung',
				type: 'text',
				placeholder: 'Benutzerkennung',
				required: true
			}
		},
		{
			component: Input,
			value: null,
			props: {
				label: 'Passwort',
				type: 'password',
				placeholder: 'Passwort',
				required: true
			}
		},
		{
			component: Select,
			value: null,
			props: {
				label: 'Rolle',
				items: ['Beobachter', 'Wissenschaftler', 'Admin'].map((v) => {
					return { name: String(v), value: v };
				}),
				placeholder: 'Bitte auswählen',
				required: true
			}
		}
	];
</script>

<UserLogin {data} />
