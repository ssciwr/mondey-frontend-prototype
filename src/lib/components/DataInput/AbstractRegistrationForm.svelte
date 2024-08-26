<script>
	import { Button, Card, Heading, Input, Label } from 'flowbite-svelte';

	export let data;
	export let heading = '';
	export let buttonLabel = '';
</script>

<Card>
	<Heading tag="h3">{heading}</Heading>
	<form>
		{#each data as { label, type, placeholder }}
			<Label>{label}</Label>
			<Input {type} {label} {placeholder} />
		{/each}
	</form>
	<Button type="submit" href="/registerUser/userDataInput" class="w-full">{buttonLabel}</Button>
</Card>
