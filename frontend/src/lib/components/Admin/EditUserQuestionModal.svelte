<script lang="ts">
	import {
		Button,
		Badge,
		Card,
		InputAddon,
		Textarea,
		Input,
		Label,
		ButtonGroup,
		Modal,
		Select,
		type SelectOptionType
	} from 'flowbite-svelte';
	import { lang_id, languages } from '$lib/stores/adminStore';
	import { updateUserQuestion } from '$lib/admin';
	import InputPreview from '$lib/components/Admin/InputPreview.svelte';

	export let open: boolean = false;
	export let userQuestion: object | null = null;

	let preview_lang_id = '1';
	let preview_answer = '';

	const inputTypes: SelectOptionType<string>[] = [
		{ value: 'text', name: 'text' },
		{ value: 'select', name: 'select' }
	];

	function updateOptionsJson() {
		const values = userQuestion.options.split(';');
		for (const lid in $languages) {
			const items = userQuestion.text[lid].options.split(';');
			userQuestion.text[lid].options_json = JSON.stringify(
				values.map(function (value, index) {
					return { value: value, name: items[index] };
				})
			);
		}
	}

	export async function saveChanges() {
		try {
			await updateUserQuestion(userQuestion);
		} catch (e) {
			console.error(e);
		}
	}
</script>

<Modal title="Edit user question" bind:open autoclose size="xl">
	{#if userQuestion}
		<div class="flex flex-row items-center">
			<div class="mr-5 grow">
				<div class="mb-5">
					<Label class="mb-2">Question</Label>
					{#each Object.values(userQuestion.text) as text}
						<div class="mb-1">
							<ButtonGroup class="w-full">
								<InputAddon>{$languages[text.lang_id]}</InputAddon>
								<Input
									bind:value={text.question}
									on:input={() => {
										userQuestion = userQuestion;
									}}
									placeholder="Question"
								/>
							</ButtonGroup>
						</div>
					{/each}
				</div>
				<div class="mb-5">
					<Label class="mb-2">Input type</Label>
					<Select class="mt-2" items={inputTypes} bind:value={userQuestion.input} placeholder="" />
				</div>
				{#if userQuestion.input === 'select'}
					<div class="mb-5">
						<Label class="mb-2">Options</Label>
						<div class="mb-1">
							<ButtonGroup class="w-full">
								<InputAddon>name</InputAddon>
								<Textarea
									bind:value={userQuestion.options}
									on:input={updateOptionsJson}
									placeholder="Option names"
								/>
							</ButtonGroup>
						</div>
						{#each Object.values(userQuestion.text) as text}
							<div class="mb-1">
								<ButtonGroup class="w-full">
									<InputAddon>{$languages[text.lang_id]}</InputAddon>
									<Textarea
										bind:value={text.options}
										on:input={updateOptionsJson}
										placeholder="Options"
									/>
								</ButtonGroup>
							</div>
						{/each}
					</div>
				{/if}
			</div>
			<div>
				<Card>
					<div class="mb-5">
						<Label class="mb-2">Preview</Label>
						<div class="flex flex-row">
							<ButtonGroup class="mb-2 mr-2">
								{#each Object.entries($languages) as [lid, lang]}
									<Button
										checked={preview_lang_id === lid}
										on:click={(e) => {
											e.stopPropagation();
											preview_lang_id = lid;
										}}>{lang}</Button
									>
								{/each}
							</ButtonGroup>
						</div>
						<Card class="mb-4 bg-blue-300">
							<InputPreview
								data={userQuestion}
								lang_id={preview_lang_id}
								bind:answer={preview_answer}
							/>
						</Card>
						<Label class="mb-2">Generated answer:</Label>
						<Badge large border color="dark">{preview_answer}</Badge>
					</div>
				</Card>
			</div>
		</div>
	{/if}
	<svelte:fragment slot="footer">
		<Button color="green" on:click={saveChanges}>Save changes</Button>
		<Button color="alternative">Cancel</Button>
	</svelte:fragment>
</Modal>
