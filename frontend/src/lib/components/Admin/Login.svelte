<script lang="ts">
	import { Input, Label, Button, Card, Alert } from 'flowbite-svelte';
	import { isLoggedIn } from '$lib/stores/adminStore';
	import { authCookieLogin } from '$lib/client/services.gen';
	import type { AuthCookieLoginData } from '$lib/client/types.gen';
	import { _ } from 'svelte-i18n';

	const loginData: AuthCookieLoginData = {
		body: { username: '', password: '' }
	};
	let errorCode: string = '';

	async function doLogin() {
		const { data, error } = await authCookieLogin(loginData);
		console.log(data);
		console.log(error);
		if (error) {
			errorCode = error?.detail as string;
			isLoggedIn.set(false);
		} else {
			errorCode = '';
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
			<Button type="submit" class="mb-6">Login</Button>
			{#if errorCode !== ''}
				<Alert>{$_(errorCode)}</Alert>
			{/if}
		</form>
	</div>
</Card>
