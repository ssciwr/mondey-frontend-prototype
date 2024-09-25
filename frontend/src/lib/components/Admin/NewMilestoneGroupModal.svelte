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
	import { FileImageSolid } from 'flowbite-svelte-icons';

	export let open: boolean = false;
	export let milestoneGroupData = {
		group: { order: 0 },
		text: [
			{ lang: 'en', title: '', desc: '' },
			{ lang: 'de', title: '', desc: '' }
		]
	};
	let files: FileList;
	let image: string | ArrayBuffer | null | undefined = '';

	$: if (files) {
		const reader = new FileReader();
		reader.readAsDataURL(files[0]);
		reader.onload = (e) => {
			image = e?.target?.result;
		};
	}

	async function postMilestoneGroup() {
		console.log(milestoneGroupData);
		try {
			const res_milestone_group = await fetch(
				`${import.meta.env.VITE_MONDEY_API_URL}/admin/milestone-groups/`,
				{
					method: 'POST',
					credentials: 'include',
					headers: {
						'Content-Type': 'application/json',
						Accept: 'application/json'
					},
					body: JSON.stringify(milestoneGroupData)
				}
			);
			const new_milestone_group = await res_milestone_group.json();
			console.log(new_milestone_group);
			if (files) {
				let formData = new FormData();
				formData.append('file', files[0]);
				const res_milestone_group_image = await fetch(
					`${import.meta.env.VITE_MONDEY_API_URL}/admin/upload-milestone-group-image/${new_milestone_group.id}`,
					{
						method: 'POST',
						credentials: 'include',
						body: formData
					}
				);
				const new_milestone_group_image = await res_milestone_group_image.json();
				console.log(new_milestone_group_image);
			}
		} catch (e) {
			console.error(e);
		}
	}
</script>

<Modal title="Create milestone group" bind:open autoclose size="xl">
	<div class="mb-5">
		<Label class="mb-2">Title</Label>
		{#each milestoneGroupData.text as text}
			<div class="mb-1">
				<ButtonGroup class="w-full">
					<InputAddon>{text.lang}</InputAddon>
					<Input bind:value={text.title} placeholder="Title" />
				</ButtonGroup>
			</div>
		{/each}
	</div>
	<div class="mb-5">
		<Label class="mb-2">Description</Label>
		{#each milestoneGroupData.text as text}
			<div class="mb-1">
				<ButtonGroup class="w-full">
					<InputAddon>{text.lang}</InputAddon>
					<Textarea bind:value={text.desc} placeholder="Description" />
				</ButtonGroup>
			</div>
		{/each}
	</div>
	<div class="mb-5">
		<Label for="img_upload" class="pb-2">Image</Label>
		<div class="flex flex-row">
			{#if image}
				<img src={`${image ?? ''}`} width="48" height="48" alt="MilestoneGroup" class="mx-2" />
			{:else}
				<FileImageSolid class="h-[48px] w-[48px]" />
			{/if}
			<Fileupload bind:files accept=".jpg, .jpeg" id="img_upload" class="mb-2 flex-grow-0" />
		</div>
	</div>
	<svelte:fragment slot="footer">
		<Button color="green" on:click={postMilestoneGroup}>Save changes</Button>
		<Button color="alternative">Cancel</Button>
	</svelte:fragment>
</Modal>
