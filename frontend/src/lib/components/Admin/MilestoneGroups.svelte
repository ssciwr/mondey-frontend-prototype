<script lang="ts">
	import {
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell,
		Card
	} from 'flowbite-svelte';
	import { _ } from 'svelte-i18n';
	import { ChevronUpOutline, ChevronDownOutline } from 'flowbite-svelte-icons';
	import EditMilestoneGroupModal from '$lib/components/Admin/EditMilestoneGroupModal.svelte';
	import DeleteModal from '$lib/components/Admin/DeleteModal.svelte';
	import AddButton from '$lib/components/Admin/AddButton.svelte';
	import EditButton from '$lib/components/Admin/EditButton.svelte';
	import DeleteButton from '$lib/components/Admin/DeleteButton.svelte';
	import { lang_id, milestoneGroups } from '$lib/stores/adminStore';
	import { refreshMilestoneGroups, newMilestoneGroup, milestoneGroupImageUrl } from '$lib/admin';
	import { onMount } from 'svelte';
	import { deleteMilestoneGroup } from '$lib/admin.js';

	let currentGroup: object | null = null;
	let openGroupIndex: number | null = null;
	let currentGroupId: number | null = null;
	let showEditGroupModal: boolean = false;
	let showDeleteModal: boolean = false;

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
		{$_('admin.milestone-groups')}
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
								src={milestoneGroupImageUrl(milestoneGroup.id)}
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
							<EditButton
								onClick={() => {
									currentGroup = $milestoneGroups[groupIndex];
									showEditGroupModal = true;
								}}
							/>
							<DeleteButton
								onClick={() => {
									currentGroupId = milestoneGroup.id;
									showDeleteModal = true;
								}}
							/>
						</TableBodyCell>
					</TableBodyRow>
				{/each}
				<TableBodyRow>
					<TableBodyCell></TableBodyCell>
					<TableBodyCell></TableBodyCell>
					<TableBodyCell></TableBodyCell>
					<TableBodyCell>
						<AddButton onClick={addMilestoneGroup} />
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
<DeleteModal
	bind:open={showDeleteModal}
	onClick={() => {
		deleteMilestoneGroup(currentGroupId);
	}}
></DeleteModal>
