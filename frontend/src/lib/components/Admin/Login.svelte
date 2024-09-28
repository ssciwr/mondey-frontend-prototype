<script lang="ts">
	import { Input, Label, Button, Card } from 'flowbite-svelte';
	import { isLoggedIn } from '$lib/stores/adminStore';
	import { authCookieLogin } from '$lib/client/services.gen';
	import type { AuthCookieLoginData } from '$lib/client/types.gen';

	const loginData: AuthCookieLoginData = {
		body: { username: '', password: '' }
	};

	async function doLogin() {
		const { data, error } = await authCookieLogin(loginData);
		console.log(data);
		if (error) {
			isLoggedIn.set(false);
		} else {
			isLoggedIn.set(true);
		}
	}
</script>

<Card size="lg">
	<h5 class="mb-5 text-center text-2xl font-bold text-gray-900 dark:text-white">Admin login</h5>
	<div class="mb-5">
		<form on:submit|preventDefault={doLogin}>
			<div class="mb-6">
				<Label for="email" class="mb-2">Email address</Label>
				<Input
					type="email"
					bind:value={loginData.body.username}
					id="email"
					placeholder="john.doe@company.com"
					required
					autocomplete="username"
				/>
			</div>
			<div class="mb-6">
				<Label for="password" class="mb-2">Password</Label>
				<Input
					type="password"
					bind:value={loginData.body.password}
					id="password"
					placeholder="•••••••••"
					required
					autocomplete="current-password"
				/>
			</div>
			<Button type="submit">Login</Button>
		</form>
	</div>
</Card>
