<script lang="ts">
	import {
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell,
		Card,
		Button
	} from 'flowbite-svelte';
	import { _ } from 'svelte-i18n';
	import { ChevronUpOutline, ChevronDownOutline, PlusOutline } from 'flowbite-svelte-icons';
	import EditMilestoneGroupModal from '$lib/components/Admin/EditMilestoneGroupModal.svelte';
	import DeleteMilestoneGroupModal from '$lib/components/Admin/DeleteMilestoneGroupModal.svelte';
	import { lang_id, milestoneGroups } from '$lib/stores/adminStore';
	import { refreshMilestoneGroups, newMilestoneGroup } from '$lib/admin';
	import { onMount } from 'svelte';

	let currentGroup: object | null = null;
	let openGroupIndex: number | null = null;
	let currentGroupId: number | null = null;
	let showEditGroupModal: boolean = false;
	let showDeleteGroupModal: boolean = false;

	function toggleOpenGroupIndex(index: number) {
		if (openGroupIndex == index) {
			openGroupIndex = null;
		} else {
			openGroupIndex = index;
		}
	}

	async function addMilestoneGroup() {
		currentGroup = await newMilestoneGroup();
		if (currentGroup === null) {
			return;
		}
		openGroupIndex = null;
		showEditGroupModal = true;
	}

	onMount(async () => {
		await refreshMilestoneGroups();
	});
</script>

<Card size="xl" class="m-5">
	<h3 class="mb-3 text-xl font-medium text-gray-900 dark:text-white">
		{$_('admin.milestonegroups')}
	</h3>
	{#if milestoneGroups}
		<Table>
			<TableHead>
				<TableHeadCell></TableHeadCell>
				<TableHeadCell>Image</TableHeadCell>
				<TableHeadCell>Title</TableHeadCell>
				<TableHeadCell>Actions</TableHeadCell>
			</TableHead>
			<TableBody>
				{#each $milestoneGroups as milestoneGroup, groupIndex (milestoneGroup.id)}
					{@const title = milestoneGroup?.text[$lang_id]?.title}
					<TableBodyRow
						on:click={() => {
							toggleOpenGroupIndex(groupIndex);
						}}
						class={openGroupIndex === null || openGroupIndex === groupIndex
							? 'opacity-100'
							: 'opacity-25'}
					>
						<TableBodyCell>
							{#if openGroupIndex === groupIndex}
								<ChevronUpOutline />
							{:else}
								<ChevronDownOutline />
							{/if}
						</TableBodyCell>
						<TableBodyCell>
							<img
								src={`${import.meta.env.VITE_MONDEY_API_URL}/static/milestone_group_${milestoneGroup.id}.jpg`}
								width="64"
								height="64"
								alt={title}
								class="p-2"
							/>
						</TableBodyCell>
						<TableBodyCell>
							{title}
						</TableBodyCell>
						<TableBodyCell>
							<Button
								color="yellow"
								on:click={() => {
									currentGroup = $milestoneGroups[groupIndex];
									showEditGroupModal = true;
								}}>Edit</Button
							>
							<Button
								color="red"
								on:click={() => {
									currentGroupId = milestoneGroup.id;
									showDeleteGroupModal = true;
								}}>Delete</Button
							>
						</TableBodyCell>
					</TableBodyRow>
				{/each}
				<TableBodyRow>
					<TableBodyCell></TableBodyCell>
					<TableBodyCell></TableBodyCell>
					<TableBodyCell></TableBodyCell>
					<TableBodyCell>
						<Button color="blue" on:click={addMilestoneGroup}
							><PlusOutline class="mr-2"></PlusOutline>Add milestone group</Button
						>
					</TableBodyCell>
				</TableBodyRow>
			</TableBody>
		</Table>
	{/if}
</Card>

{#key showEditGroupModal}
	<EditMilestoneGroupModal bind:open={showEditGroupModal} milestoneGroup={currentGroup}
	></EditMilestoneGroupModal>
{/key}
<DeleteMilestoneGroupModal bind:open={showDeleteGroupModal} groupId={currentGroupId}
></DeleteMilestoneGroupModal>
