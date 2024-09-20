<script lang="ts">
    import {Input, Label, Button, Card} from 'flowbite-svelte';
    import {isLoggedIn} from '$lib/stores/adminStore';

    let email: string = "";
    let password: string = "";

    async function do_login() {
        try {
            const formData = new FormData();
            formData.append("username", email);
            formData.append("password", password);
            const res = await fetch("http://localhost:8000/auth/login", {
                method: 'POST',
                body: formData
            });
            console.log(res.status)
            if (res.status === 204) {
                isLoggedIn.set(true);
            } else {
                isLoggedIn.set(false);
            }
        } catch (e) {
            console.log(e);
            isLoggedIn.set(false);
        }
    }
</script>

<Card size="lg">
    <h5 class="text-center mb-5 text-2xl font-bold text-gray-900 dark:text-white">
        Admin login
    </h5>
    <div class="mb-5">
        <form on:submit|preventDefault="{do_login}">
            <div class="mb-6">
                <Label for="email" class="mb-2">Email address</Label>
                <Input type="email" bind:value={email} id="email" placeholder="john.doe@company.com" required
                       autocomplete="username"/>
            </div>
            <div class="mb-6">
                <Label for="password" class="mb-2">Password</Label>
                <Input type="password" bind:value={password} id="password" placeholder="•••••••••" required
                       autocomplete="current-password"/>
            </div>
            <Button type="submit">Login</Button>
        </form>
    </div>
</Card>
