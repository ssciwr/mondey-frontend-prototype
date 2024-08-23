<script>
	import { Button, Card, Heading, Input, Label } from 'flowbite-svelte';

	export let data;
</script>

<Card>
	<form>
		<Heading tag="h3">Registrieren sie sich als neuer Nutzer</Heading>
		<Label>Benutzername</Label>
		<Input type="text" label="Username" placeholder="Bestimmen sie eine beliebigen Benutzernamen" />
		<Label>Email (optional)</Label>
		<Input type="text" label="Email" placeholder="Email" />
		<Label>Passwort</Label>
		<Input type="text" label="Password" placeholder="Passwort" />
		<Label>Passwort bestätigen</Label>
		<Input type="text" label="Confirm Password" placeholder="Passwort bestätigen" />
		<Button type="submit" class="w-full">Weiter</Button>
	</form>
</Card>
