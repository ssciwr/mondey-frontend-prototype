<script lang="ts">
	import {
		Button,
		InputAddon,
		Textarea,
		Label,
		ButtonGroup,
		Fileupload,
		Modal
	} from 'flowbite-svelte';
	import { _ } from 'svelte-i18n';
	import { onMount } from 'svelte';
	import { languages } from '$lib/stores/adminStore';
	import type { MilestoneGroupAdmin } from '$lib/client/types.gen';
	import { updateMilestoneGroupAdmin, uploadMilestoneGroupImage } from '$lib/client/services.gen';
	import { milestoneGroupImageUrl, refreshMilestoneGroups } from '$lib/admin';

	export let open: boolean = false;
	export let milestoneGroup: MilestoneGroupAdmin | null = null;

	const textKeys = ['title', 'desc'];
	let files: FileList;
	let image: string = '';

	onMount(() => {
		if (milestoneGroup) {
			image = milestoneGroupImageUrl(milestoneGroup.id);
		}
	});

	function updateImageToUpload(event: Event) {
		const target = event.target as HTMLInputElement;
		if (target.files && target.files.length > 0) {
			image = URL.createObjectURL(target.files[0]);
		}
	}

	async function reloadImg(url: string) {
		await fetch(url, { cache: 'reload', mode: 'no-cors' });
		document.body
			.querySelectorAll(`img[src='${url}']`)
			.forEach((img) => ((img as HTMLImageElement).src = url));
	}

	export async function saveChanges() {
		if (!milestoneGroup) {
			return;
		}
		const { data, error } = await updateMilestoneGroupAdmin({ body: milestoneGroup });
		if (error) {
			console.log(error);
		} else {
			console.log(data);
			if (files && files.length > 0) {
				await uploadMilestoneGroupImage({
					body: { file: files[0] },
					path: { milestone_group_id: milestoneGroup.id }
				});
				await reloadImg(milestoneGroupImageUrl(milestoneGroup.id));
			}
			await refreshMilestoneGroups();
		}
	}
</script>

<Modal title={$_('admin.edit')} bind:open autoclose size="xl">
	{#if milestoneGroup}
		{#each textKeys as textKey}
			{@const title = $_(`admin.${textKey}`)}
			<div class="mb-5">
				<Label class="mb-2">{title}</Label>
				{#each Object.entries($languages) as [lang_id, lang]}
					<div class="mb-1">
						<ButtonGroup class="w-full">
							<InputAddon>{lang}</InputAddon>
							<Textarea bind:value={milestoneGroup.text[lang_id][textKey]} placeholder={title} />
						</ButtonGroup>
					</div>
				{/each}
			</div>
		{/each}
		<div class="mb-5">
			<Label for="img_upload" class="pb-2">{$_('admin.image')}</Label>
			<div class="flex flex-row">
				<img src={image} width="48" height="48" alt="MilestoneGroup" class="mx-2" />
				<Fileupload
					bind:files
					on:change={updateImageToUpload}
					accept=".jpg, .jpeg"
					id="img_upload"
					class="mb-2 flex-grow-0"
				/>
			</div>
		</div>
	{/if}
	<svelte:fragment slot="footer">
		<Button color="green" on:click={saveChanges}>{$_('admin.save-changes')}</Button>
		<Button color="alternative">{$_('admin.cancel')}</Button>
	</svelte:fragment>
</Modal>
