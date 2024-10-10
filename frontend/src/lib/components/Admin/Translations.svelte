<svelte:options runes={true} />

<script lang="ts">
	import {
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell,
		Card,
		Input,
		InputAddon
	} from 'flowbite-svelte';
	import { _ } from 'svelte-i18n';
	import { refreshLanguages, getI18nJson } from '$lib/i18n';
	import { languages } from '$lib/stores/langStore';
	import { updateI18N } from '$lib/client/services.gen';
	import SaveButton from '$lib/components/Admin/SaveButton.svelte';
	import { onMount } from 'svelte';

	type Translation = Record<string, Record<string, string>>;
	let translations = $state({} as Record<string,Translation>);

	async function refreshTranslations() {
		for (const lang_id of Object.values($languages)) {
			console.log(lang_id);
			const json = await getI18nJson(lang_id);
			console.log(`${lang_id}`);
			console.log(json);
			translations[`${lang_id}`] = json;
			console.log(translations);
		}
		console.log(translations);
	}

	async function saveChanges() {
		for (const lang_id of Object.values($languages)) {
			const { data, error } = await updateI18N({
				body: translations[`${lang_id}`],
				path: {
					language_id: lang_id
				}
			});
			if (error) {
				console.log(error);
				return;
			} else {
				console.log(data);
			}
		}
		await refreshLanguages();
	}

	onMount(() => refreshTranslations());
</script>

<Card size="xl" class="m-5">
	<h3 class="mb-3 text-xl font-medium text-gray-900 dark:text-white">{$_('admin.translations')}</h3>
	<Table>
		<TableHead>
			<TableHeadCell>Name</TableHeadCell>
			{#each Object.keys($languages) as lang}
				<TableHeadCell>{lang}</TableHeadCell>
			{/each}
		</TableHead>
		<TableBody>
			{#if '1' in translations}
				{#each Object.keys(translations['1']) as section}
					<TableBodyRow>
						<TableBodyCell>
							{section}
						</TableBodyCell>
					</TableBodyRow>
					{#each Object.keys(translations['1'][section]) as key}
						<TableBodyRow>
							<TableBodyCell>
								{key}
							</TableBodyCell>
							{#each Object.entries($languages) as [lang, lang_id]}
								<TableBodyCell>
									{lang_id}
<!--									<InputAddon>{lang}</InputAddon>-->
<!--									<Input bind:value={translations[`${lang_id}`][section][key]} />-->
								</TableBodyCell>
							{/each}
						</TableBodyRow>
					{/each}
				{/each}
				<TableBodyRow>
					<TableBodyCell>
						<SaveButton onclick={saveChanges} />
					</TableBodyCell>
				</TableBodyRow>
			{/if}
		</TableBody>
	</Table>
</Card>
