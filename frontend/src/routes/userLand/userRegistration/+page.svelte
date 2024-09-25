<script lang="ts">
	import UserRegistration from '$lib/components/UserRegistration.svelte';
	import { hash } from '$lib/stores/userStore';
	let passwd: string;
	let passwdTest: string;

	const data = [
		{
			label: 'Benutzername',
			name: 'Benutzername',
			type: 'text',
			placeholder: 'Wählen sie einen beliebigen Benutzernamen',
			required: true,
			checkValid: () => {
				return true;
			}
		},
		{
			label: 'E-Mail',
			name: 'E-Mail',
			type: 'email',
			placeholder: 'E-Mail',
			required: true,
			checkValid: () => {
				return true;
			}
		},
		{
			label: 'Passwort',
			name: 'Passwort',
			type: 'password',
			placeholder: 'Passwort',
			required: true,
			onBlur: async (event: Event) => {
				passwd = await hash(event.srcElement.value);
			},
			checkValid: () => {
				return passwd !== '' && passwd !== null && passwd !== undefined && passwd === passwdTest;
			}
		},
		{
			label: 'Passwort wiederholen',
			name: 'Passwort wiederholen',
			type: 'password',
			placeholder: 'Passwort wiederholen',
			required: true,
			onBlur: async (event: Event) => {
				passwdTest = await hash(event.srcElement.value);
			},
			checkValid: () => {
				return passwd !== '' && passwd !== null && passwd !== undefined && passwd === passwdTest;
			}
		}
	];
</script>

<UserRegistration {data} />
