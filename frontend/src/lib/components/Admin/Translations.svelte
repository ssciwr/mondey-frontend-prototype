<svelte:options runes={true} />

<script lang="ts">
	import {
		Card,
		Input,
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell
	} from 'flowbite-svelte';
	import { onMount } from 'svelte';
	import { _ } from 'svelte-i18n';
	import { getI18nJson, getTranslations } from '$lib/i18n';
	import { languages } from '$lib/stores/langStore';
	import { updateI18N } from '$lib/client/services.gen';
	import SaveButton from '$lib/components/Admin/SaveButton.svelte';
	import de from '../../../locales/de.json';

	type Translation = Record<string, Record<string, string>>;
	let translations = $state({} as Record<string, Translation>);

	async function refreshTranslations() {
		for (const lang_id of Object.values($languages)) {
			if(lang_id !== 1){
				translations[`${lang_id}`] = await getI18nJson(lang_id);
			}
		}
	}

	async function saveChanges() {
		for (const lang_id of Object.keys(translations)) {
			const { data, error } = await updateI18N({
				body: translations[`${lang_id}`],
				path: {
					language_id: Number(lang_id)
				}
			});
			if (error) {
				console.log(error);
				return;
			} else {
				console.log(data);
			}
		}
		await getTranslations();
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
				{#each Object.keys(de) as section}
					{#each Object.entries(de[section]) as [key, value]}
						<TableBodyRow>
							<TableBodyCell>
								{section}.{key}
							</TableBodyCell>
							<TableBodyCell>
								{value}
							</TableBodyCell>
							{#each Object.keys(translations) as lang_id}
								<TableBodyCell>
									<Input bind:value={translations[lang_id][section][key]} />
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
		</TableBody>
	</Table>
</Card>
