<script lang="ts">
	import {
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell,
		Card,
		Button,
		Select
	} from 'flowbite-svelte';
	import { PlusOutline } from 'flowbite-svelte-icons';
	import ISO6391 from 'iso-639-1';
	import { _ } from 'svelte-i18n';
	import type { SelectOptionType } from 'flowbite-svelte';
	import { updateLanguages } from '$lib/i18n';
	import { languages } from '$lib/stores/adminStore';

	const langCodes = ISO6391.getAllCodes();
	const langNames = ISO6391.getAllNativeNames();
	const langItems = langCodes.reduce(
		(acc, k, i) => [...acc, { value: k, name: langNames[i] }],
		[] as SelectOptionType<string>[]
	);
	let selectedLang: string = '';

	async function newLanguage() {
		try {
			const res = await fetch(`${import.meta.env.VITE_MONDEY_API_URL}/admin/languages`, {
				method: 'POST',
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json'
				},
				body: JSON.stringify({ lang: selectedLang })
			});
			if (res.status === 200) {
				await updateLanguages();
			} else {
				console.log('Failed to create new Language');
			}
		} catch (e) {
			console.error(e);
		}
	}

	async function deleteLanguage(id: string) {
		try {
			const res = await fetch(`${import.meta.env.VITE_MONDEY_API_URL}/admin/languages/${id}`, {
				method: 'DELETE',
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json'
				}
			});
			if (res.status === 200) {
				await updateLanguages();
			} else {
				console.log('Failed to create new Language');
			}
		} catch (e) {
			console.error(e);
		}
	}
</script>

<Card size="xl" class="m-5">
	<h3 class="mb-3 text-xl font-medium text-gray-900 dark:text-white">{$_('admin.languages')}</h3>
	<Table>
		<TableHead>
			<TableHeadCell>Code (ISO 639-1)</TableHeadCell>
			<TableHeadCell>Name</TableHeadCell>
			<TableHeadCell>Actions</TableHeadCell>
		</TableHead>
		<TableBody>
			{#each Object.entries($languages) as [id, lang]}
				<TableBodyRow>
					<TableBodyCell>
						{lang}
					</TableBodyCell>
					<TableBodyCell>
						{ISO6391.getNativeName(lang)}
					</TableBodyCell>
					<TableBodyCell>
						<Button
							color="red"
							on:click={() => {
								deleteLanguage(id);
							}}>Delete</Button
						>
					</TableBodyCell>
				</TableBodyRow>
			{/each}
			<TableBodyRow>
				<TableBodyCell></TableBodyCell>
				<TableBodyCell>
					<Select
						class="mt-2"
						items={langItems}
						bind:value={selectedLang}
						placeholder="Select a language..."
					/>
				</TableBodyCell>
				<TableBodyCell>
					<Button color="blue" on:click={newLanguage} disabled={selectedLang === ''}
						><PlusOutline class="mr-2"></PlusOutline>Add language</Button
					>
				</TableBodyCell>
			</TableBodyRow>
		</TableBody>
	</Table>
</Card>
