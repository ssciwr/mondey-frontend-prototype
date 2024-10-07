<script lang="ts">
	import {
		Button,
		InputAddon,
		Textarea,
		Input,
		Label,
		ButtonGroup,
		Fileupload,
		Modal
	} from 'flowbite-svelte';
	import { languages } from '$lib/stores/adminStore';
	import {
		updateMilestoneGroup,
		uploadMilestoneGroupImage,
		milestoneGroupImageUrl
	} from '$lib/admin';

	export let open: boolean = false;
	export let milestoneGroup: object | null = null;

	let files: FileList;
	let image: string | ArrayBuffer | null | undefined = null;

	$: if (milestoneGroup !== null) {
		image = milestoneGroupImageUrl(milestoneGroup.id);
	}

	$: if (files) {
		const reader = new FileReader();
		reader.readAsDataURL(files[0]);
		reader.onload = (e) => {
			image = e?.target?.result;
		};
	}

	async function reloadImg(url: string) {
		await fetch(url, { cache: 'reload', mode: 'no-cors' });
		document.body.querySelectorAll(`img[src='${url}']`).forEach((img) => (img.src = url));
	}

	export async function saveChanges() {
		try {
			await updateMilestoneGroup(milestoneGroup);
			if (files) {
				await uploadMilestoneGroupImage(milestoneGroup.id, files[0]);
				await reloadImg(milestoneGroupImageUrl(milestoneGroup.id));
			}
		} catch (e) {
			console.error(e);
		}
	}
</script>

<Modal title="Edit milestone group" bind:open autoclose size="xl">
	{#if milestoneGroup}
		<div class="mb-5">
			<Label class="mb-2">Title</Label>
			{#each Object.entries(milestoneGroup.text) as [lang_id, text]}
				<div class="mb-1">
					<ButtonGroup class="w-full">
						<InputAddon>{$languages[text.lang_id]}</InputAddon>
						<Input bind:value={text.title} placeholder="Title" />
					</ButtonGroup>
				</div>
			{/each}
		</div>
		<div class="mb-5">
			<Label class="mb-2">Description</Label>
			{#each Object.entries(milestoneGroup.text) as [lang_id, text]}
				<div class="mb-1">
					<ButtonGroup class="w-full">
						<InputAddon>{$languages[text.lang_id]}</InputAddon>
						<Textarea bind:value={text.desc} placeholder="Description" />
					</ButtonGroup>
				</div>
			{/each}
		</div>
		<div class="mb-5">
			<Label for="img_upload" class="pb-2">Image</Label>
			<div class="flex flex-row">
				<img src={image} width="48" height="48" alt="MilestoneGroup" class="mx-2" />
				<Fileupload bind:files accept=".jpg, .jpeg" id="img_upload" class="mb-2 flex-grow-0" />
			</div>
		</div>
	{/if}
	<svelte:fragment slot="footer">
		<Button color="green" on:click={saveChanges}>Save changes</Button>
		<Button color="alternative">Cancel</Button>
	</svelte:fragment>
</Modal>
