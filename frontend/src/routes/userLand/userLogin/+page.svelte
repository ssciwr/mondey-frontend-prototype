<script>
	import UserLogin from '$lib/components/UserLogin.svelte';

	const data = [
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
</script>

<UserLogin {data} />
