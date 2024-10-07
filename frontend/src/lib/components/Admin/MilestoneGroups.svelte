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
	import EditMilestoneModal from '$lib/components/Admin/EditMilestoneModal.svelte';
	import DeleteModal from '$lib/components/Admin/DeleteModal.svelte';
	import AddButton from '$lib/components/Admin/AddButton.svelte';
	import EditButton from '$lib/components/Admin/EditButton.svelte';
	import DeleteButton from '$lib/components/Admin/DeleteButton.svelte';
	import { lang_id, milestoneGroups } from '$lib/stores/adminStore';
	import {
		refreshMilestoneGroups,
		newMilestoneGroup,
		newMilestone,
		deleteMilestoneGroup,
		deleteMilestone,
		milestoneGroupImageUrl
	} from '$lib/admin';
	import { onMount } from 'svelte';

	let currentGroup: object | null = null;
	let openGroupIndex: number | null = null;
	let currentGroupId: number | null = null;
	let showEditGroupModal: boolean = false;
	let showDeleteGroupModal: boolean = false;

	let currentMilestone: object | null = null;
	let currentMilestoneId: number | null = null;
	let showEditMilestoneModal: boolean = false;
	let showDeleteMilestoneModal: boolean = false;

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

	async function addMilestone(milestoneGroupId: number) {
		currentMilestone = await newMilestone(milestoneGroupId);
		if (currentMilestone === null) {
			return;
		}
		showEditMilestoneModal = true;
	}

	onMount(async () => {
		await refreshMilestoneGroups();
	});

	$: console.log($milestoneGroups);
</script>

<Card size="xl" class="m-5">
	{#if milestoneGroups}
		<Table>
			<TableHead>
				<TableHeadCell colSpan="4">{$_('admin.milestone-groups')}</TableHeadCell>
			</TableHead>
			<TableBody>
				{#each $milestoneGroups as milestoneGroup, groupIndex (milestoneGroup.id)}
					{@const groupTitle = milestoneGroup?.text[$lang_id]?.title}
					<TableBodyRow
						on:click={() => {
							toggleOpenGroupIndex(groupIndex);
						}}
						class={`${openGroupIndex === null || openGroupIndex === groupIndex ? 'opacity-100' : 'opacity-25'} ${openGroupIndex === groupIndex ? 'bg-blue-100' : ''}`}
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
								alt={groupTitle}
								class="p-2"
							/>
						</TableBodyCell>
						<TableBodyCell>
							{groupTitle}
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
									showDeleteGroupModal = true;
								}}
							/>
						</TableBodyCell>
					</TableBodyRow>
					{#if openGroupIndex === groupIndex}
						<TableBodyRow class="bg-blue-100">
							<TableBodyCell></TableBodyCell>
							<TableBodyCell colSpan="3">
								<Table>
									<TableHead>
										<TableHeadCell colspan="4">{$_('admin.milestones')}</TableHeadCell>
									</TableHead>
									<TableBody>
										{#each milestoneGroup.milestones as milestone, milestoneIndex (milestone.id)}
											{@const milestoneTitle = milestone?.text[$lang_id]?.title}
											<TableBodyRow>
												<TableBodyCell>
													{#if milestone?.images?.length}
														<img
															src={`${import.meta.env.VITE_MONDEY_API_URL}/static/${milestone.images[0].filename}`}
															width="64"
															height="64"
															alt={milestoneTitle}
															class="p-2"
														/>
													{/if}
												</TableBodyCell>
												<TableBodyCell>{milestoneTitle}</TableBodyCell>
												<TableBodyCell>
													<EditButton
														onClick={() => {
															currentMilestone =
																$milestoneGroups[groupIndex].milestones[milestoneIndex];
															console.log(currentMilestone);
															showEditMilestoneModal = true;
														}}
													/>
													<DeleteButton
														onClick={() => {
															currentMilestoneId = milestone.id;
															showDeleteMilestoneModal = true;
														}}
													/>
												</TableBodyCell>
											</TableBodyRow>
										{/each}
										<TableBodyRow>
											<TableBodyCell></TableBodyCell>
											<TableBodyCell></TableBodyCell>
											<TableBodyCell>
												<AddButton onClick={() => addMilestone(milestoneGroup.id)} />
											</TableBodyCell>
										</TableBodyRow>
									</TableBody>
								</Table>
							</TableBodyCell>
						</TableBodyRow>
					{/if}
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
	bind:open={showDeleteGroupModal}
	onClick={() => {
		deleteMilestoneGroup(currentGroupId);
	}}
></DeleteModal>

{#key showEditMilestoneModal}
	<EditMilestoneModal bind:open={showEditMilestoneModal} milestone={currentMilestone}
	></EditMilestoneModal>
{/key}
<DeleteModal
	bind:open={showDeleteMilestoneModal}
	onClick={() => {
		deleteMilestone(currentMilestoneId);
	}}
></DeleteModal>
