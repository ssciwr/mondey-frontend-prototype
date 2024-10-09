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
	import { lang_id, userQuestions } from '$lib/stores/adminStore';
	import { onMount } from 'svelte';
	import { refreshUserQuestions } from '$lib/admin';
	import { deleteUserQuestion, createUserQuestion } from '$lib/client/services.gen';
	import type { UserQuestionAdmin } from '$lib/client/types.gen';
	import EditUserQuestionModal from '$lib/components/Admin/EditUserQuestionModal.svelte';
	import DeleteModal from '$lib/components/Admin/DeleteModal.svelte';
	import AddButton from '$lib/components/Admin/AddButton.svelte';
	import EditButton from '$lib/components/Admin/EditButton.svelte';
	import DeleteButton from '$lib/components/Admin/DeleteButton.svelte';

	let currentUserQuestion: UserQuestionAdmin | null = null;
	let currentUserQuestionId: number | null = null;
	let showEditUserQuestionModal: boolean = false;
	let showDeleteModal: boolean = false;

	async function addUserQuestion() {
		const { data, error } = await createUserQuestion();
		if (error) {
			console.log(error);
			currentUserQuestion = null;
		} else {
			console.log(data);
			await refreshUserQuestions();
			currentUserQuestion = data;
			showEditUserQuestionModal = true;
		}
	}

	async function doDeleteUserQuestion() {
		if (!currentUserQuestionId) {
			return;
		}
		const { data, error } = await deleteUserQuestion({
			path: {
				user_question_id: currentUserQuestionId
			}
		});
		if (error) {
			console.log(error);
		} else {
			console.log(data);
			await refreshUserQuestions();
		}
	}

	onMount(async () => {
		await refreshUserQuestions();
	});
</script>

<Card size="xl" class="m-5">
	<h3 class="mb-3 text-xl font-medium text-gray-900 dark:text-white">
		{$_('admin.user-questions')}
	</h3>
	<Table>
		<TableHead>
			<TableHeadCell>Question</TableHeadCell>
			<TableHeadCell>Input type</TableHeadCell>
			<TableHeadCell>Options</TableHeadCell>
			<TableHeadCell>Actions</TableHeadCell>
		</TableHead>
		<TableBody>
			{#each $userQuestions as userQuestion, groupIndex (userQuestion.id)}
				<TableBodyRow>
					<TableBodyCell>
						{userQuestion?.text[$lang_id]?.question}
					</TableBodyCell>
					<TableBodyCell>
						{userQuestion?.input}
					</TableBodyCell>
					<TableBodyCell>
						{userQuestion?.text[$lang_id]?.options}
					</TableBodyCell>
					<TableBodyCell>
						<EditButton
							onClick={() => {
								currentUserQuestion = $userQuestions[groupIndex];
								showEditUserQuestionModal = true;
							}}
						/>
						<DeleteButton
							onClick={() => {
								currentUserQuestionId = userQuestion.id;
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
					<AddButton onClick={addUserQuestion} />
				</TableBodyCell>
			</TableBodyRow>
		</TableBody>
	</Table>
</Card>

{#key showEditUserQuestionModal}
	<EditUserQuestionModal bind:open={showEditUserQuestionModal} userQuestion={currentUserQuestion} />
{/key}
<DeleteModal bind:open={showDeleteModal} onClick={doDeleteUserQuestion} />
