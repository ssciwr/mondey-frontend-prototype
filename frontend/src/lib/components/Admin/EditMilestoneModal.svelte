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
	import { languages } from '$lib/stores/adminStore';
	import { _ } from 'svelte-i18n';
	import type { MilestoneAdmin } from '$lib/client/types.gen';
	import { refreshMilestoneGroups } from '$lib/admin';
	import { updateMilestone, uploadMilestoneImage } from '$lib/client/services.gen';

	export let open: boolean = false;
	export let milestone: MilestoneAdmin | null = null;

	const textKeys = ['title', 'desc', 'obs', 'help'];
	let files: FileList;
	let images: string[] = [];

	function updateImagesToUpload(event: Event) {
		const target = event.target as HTMLInputElement;
		if (target.files) {
			images = Array.from(target.files).map((f) => URL.createObjectURL(f));
		} else {
			images = [];
		}
	}

	export async function saveChanges() {
		if (!milestone) {
			return;
		}
		const { data, error } = await updateMilestone({ body: milestone });
		if (error) {
			console.log(error);
		} else {
			console.log(data);
			if (files && files.length > 0) {
				for (const file of files) {
					await uploadMilestoneImage({
						body: { file: file },
						path: { milestone_id: milestone.id }
					});
				}
			}
			await refreshMilestoneGroups();
		}
	}
</script>

<Modal title={$_('admin.edit')} bind:open autoclose size="xl">
	{#if milestone}
		{#each textKeys as textKey}
			{@const title = $_(`admin.${textKey}`)}
			<div class="mb-5">
				<Label class="mb-2">{title}</Label>
				{#each Object.entries($languages) as [lang_id, lang]}
					<div class="mb-1">
						<ButtonGroup class="w-full">
							<InputAddon>{lang}</InputAddon>
							<Textarea bind:value={milestone.text[lang_id][textKey]} placeholder={title} />
						</ButtonGroup>
					</div>
				{/each}
			</div>
		{/each}
		<div class="mb-5">
			<Label for="img_upload" class="pb-2">{$_('admin.images')}</Label>
			<div class="flex flex-row">
				{#each milestone.images as milestoneImage, milestoneImageId (milestoneImage.id)}
					<img
						src={`${import.meta.env.VITE_MONDEY_API_URL}/static/${milestoneImage.filename}`}
						width="48"
						height="48"
						alt={`${milestoneImageId}`}
						class="m-2"
					/>
				{/each}
				{#each images as image}
					<img src={image} width="48" height="48" alt="milestone" class="m-2" />
				{/each}
			</div>
			<Fileupload
				bind:files
				on:change={updateImagesToUpload}
				multiple
				accept=".jpg, .jpeg"
				id="img_upload"
				class="mb-2 flex-grow-0"
			/>
		</div>
	{/if}
	<svelte:fragment slot="footer">
		<Button color="green" on:click={saveChanges}>{$_('admin.save-changes')}</Button>
		<Button color="alternative">{$_('admin.cancel')}</Button>
	</svelte:fragment>
</Modal>
