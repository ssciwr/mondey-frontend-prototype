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
	import { refreshMilestoneGroups, updateMilestone, uploadMilestoneImage } from '$lib/admin';

	export let open: boolean = false;
	export let milestone: object | null = null;

	let files: FileList;
	let images: string[] = [];

	async function uploadImagesChanged(event) {
		const uploaded_files = [...event.target.files];
		images = await Promise.all(
			uploaded_files.map((f) => {
				return imageAsDataURL(f);
			})
		);
	}

	function imageAsDataURL(file: Blob) {
		return new Promise((resolve, reject) => {
			const fileReader = new FileReader();
			fileReader.onload = function () {
				return resolve(fileReader.result);
			};
			fileReader.onerror = function () {
				fileReader.abort();
				return reject(fileReader.error);
			};
			fileReader.readAsDataURL(file);
		});
	}

	export async function saveChanges() {
		try {
			await updateMilestone(milestone);
			if (files) {
				for (const file of files) {
					await uploadMilestoneImage(milestone.id, file);
				}
			}
			await refreshMilestoneGroups();
		} catch (e) {
			console.error(e);
		}
	}
</script>

<Modal title="Edit milestone" bind:open autoclose size="xl">
	{#if milestone}
		<div class="mb-5">
			<Label class="mb-2">Title</Label>
			{#each Object.entries(milestone.text) as [lang_id, text]}
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
			{#each Object.entries(milestone.text) as [lang_id, text]}
				<div class="mb-1">
					<ButtonGroup class="w-full">
						<InputAddon>{$languages[text.lang_id]}</InputAddon>
						<Textarea bind:value={text.desc} placeholder="Description" />
					</ButtonGroup>
				</div>
			{/each}
		</div>
		<div class="mb-5">
			<Label class="mb-2">Observation</Label>
			{#each Object.entries(milestone.text) as [lang_id, text]}
				<div class="mb-1">
					<ButtonGroup class="w-full">
						<InputAddon>{$languages[text.lang_id]}</InputAddon>
						<Textarea bind:value={text.obs} placeholder="Observation" />
					</ButtonGroup>
				</div>
			{/each}
		</div>
		<div class="mb-5">
			<Label class="mb-2">Help</Label>
			{#each Object.entries(milestone.text) as [lang_id, text]}
				<div class="mb-1">
					<ButtonGroup class="w-full">
						<InputAddon>{$languages[text.lang_id]}</InputAddon>
						<Textarea bind:value={text.help} placeholder="Help" />
					</ButtonGroup>
				</div>
			{/each}
		</div>
		<div class="mb-5">
			<Label for="img_upload" class="pb-2">Images</Label>
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
				on:change={uploadImagesChanged}
				multiple
				accept=".jpg, .jpeg"
				id="img_upload"
				class="mb-2 flex-grow-0"
			/>
		</div>
	{/if}
	<svelte:fragment slot="footer">
		<Button color="green" on:click={saveChanges}>Save changes</Button>
		<Button color="alternative">Cancel</Button>
	</svelte:fragment>
</Modal>
