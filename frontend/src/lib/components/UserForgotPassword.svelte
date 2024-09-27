<script lang="ts">
	import { base } from '$app/paths';
	import AlertMessage from '$lib/components//AlertMessage.svelte';
	import DataInput from '$lib/components/DataInput/DataInput.svelte';
	import { Button, Card, Heading, Input } from 'flowbite-svelte';

	const heading = 'Passwort vergessen?';
	const data = [
		{
			component: Input,
			type: 'text',
			value: null,
			props: {
				placeholder: 'Bitte geben sie eine E-mail Adresse an um ihr Passwort zu erneuern'
			}
		}
	];
	let alertMessage = 'Die angegebene email Adresse hat ein falsches Format';
	const alertTitle = 'Fehler';
	let valid: boolean = true;
	let showAlert: boolean = !valid;

	function validateEmail(value: string): boolean {
		const mailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return mailRegex.test(value) && value !== null;
	}

	async function submitData(mailstring: string): Promise<void> {
		try {
			const response = await fetchDummy('api/forgot-password', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(mailstring)
			});

			if (!response.ok) {
				throw new Error('Network error');
			}
		} catch (error) {
			console.log(error);
			showAlert = true;
			alertMessage = 'Beim Senden ist ein Fehler aufgetreten';
		}
	}
</script>

{#if showAlert}
	<AlertMessage
		title={alertTitle}
		message={alertMessage}
		lastpage={`${base}/userLand/lostPassword`}
		onclick={() => {
			showAlert = false;
		}}
	/>
{/if}

<div class="container m-1 mx-auto w-full max-w-xl">
	<Card class="container m-1 mx-auto mb-6 w-full max-w-xl pb-6">
		{#if heading}
			<Heading
				tag="h3"
				class="m-1 mb-3 p-1 text-center font-bold tracking-tight text-gray-700 dark:text-gray-400"
				>{heading}</Heading
			>
		{/if}

		<div class="m-1 m-3 mx-auto w-full flex-col space-y-6">
			{#each data as element}
				<DataInput
					component={element.component}
					label={element.props.label}
					bind:value={element.value}
					properties={element.props}
					eventHandlers={{
						'on:change': element.onchange,
						'on:blur': element.onblur,
						'on:click': element.onclick
					}}
				/>
			{/each}
		</div>

		<Button
			size="md"
			on:click={(event) => {
				valid = validateEmail(data[0].value);
				showAlert = !valid;
				if (valid) {
					submitData(data[0].value);
				}
			}}>Absenden</Button
		>
	</Card>
</div>
