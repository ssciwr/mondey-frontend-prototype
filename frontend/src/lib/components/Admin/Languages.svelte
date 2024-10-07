<script lang="ts">
	import {
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell,
		Card,
		Select
	} from 'flowbite-svelte';
	import ISO6391 from 'iso-639-1';
	import { _ } from 'svelte-i18n';
	import type { SelectOptionType } from 'flowbite-svelte';
	import { updateLanguages } from '$lib/i18n';
	import { languages } from '$lib/stores/adminStore';
	import DeleteModal from '$lib/components/Admin/DeleteModal.svelte';
	import AddButton from '$lib/components/Admin/AddButton.svelte';
	import DeleteButton from '$lib/components/Admin/DeleteButton.svelte';

	const langCodes = ISO6391.getAllCodes();
	const langNames = ISO6391.getAllNativeNames();
	const langItems = langCodes.map((k, i) => {
		return { value: k, name: langNames[i] };
	}) as SelectOptionType<string>[];

	let selectedLang: string = '';
	let currentLanguageId: string = '';
	let showDeleteModal: boolean = false;

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
						<DeleteButton
							onClick={() => {
								currentLanguageId = id;
								showDeleteModal = true;
							}}
						/>
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
					<AddButton onClick={newLanguage} disabled={selectedLang === ''} />
				</TableBodyCell>
			</TableBodyRow>
		</TableBody>
	</Table>
</Card>

<DeleteModal
	bind:open={showDeleteModal}
	onClick={() => {
		deleteLanguage(currentLanguageId);
	}}
></DeleteModal>
