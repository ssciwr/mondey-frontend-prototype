<script lang="ts">
	import {
		Card,
		Button,
		InputAddon,
		Textarea,
		Input,
		Label,
		ButtonGroup,
		Fileupload
	} from 'flowbite-svelte';
	import { FileImageSolid } from 'flowbite-svelte-icons';

	export let milestoneGroupData = {
		group: { order: 0 },
		text: [
			{ lang: 'en', title: '', desc: '' },
			{ lang: 'de', title: '', desc: '' }
		]
	};
	let files: FileList;
	let image: string | ArrayBuffer | null | undefined = '';
	let result = '';

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
			const res_milestone_group = await fetch('http://localhost:8000/admin/milestone-groups/', {
				method: 'POST',
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json'
				},
				body: JSON.stringify(milestoneGroupData)
			});
			const new_milestone_group = await res_milestone_group.json();
			console.log(new_milestone_group);
			result = JSON.stringify(new_milestone_group);
			if (files) {
				let formData = new FormData();
				formData.append('file', files[0]);
				const res_milestone_group_image = await fetch(
					`http://localhost:8000/admin/upload-milestone-group-image/${new_milestone_group.id}`,
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

<Card size="xl">
	<h5 class="mb-5 text-center text-2xl font-bold text-gray-900 dark:text-white">
		New MilestoneGroup
	</h5>
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
		{#if image}
			<img src={`${image ?? ''}`} width="100" height="100" alt="MilestoneGroup" />
		{:else}
			<FileImageSolid class="h-[100px] w-[100px]" />
		{/if}
		<Fileupload bind:files accept=".jpg, .jpeg" id="img_upload" class="mb-2" />
	</div>
	<Button class="w-full" on:click={postMilestoneGroup}>Create</Button>
</Card>
<h1>{result}</h1>
