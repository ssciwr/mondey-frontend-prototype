<script lang="ts">
	import { Button, Modal } from 'flowbite-svelte';
	import { ExclamationCircleOutline } from 'flowbite-svelte-icons';
	import { deleteMilestoneGroup } from '$lib/admin';

	export let open: boolean;
	export let groupId: number | null;
</script>

<Modal bind:open size="xs" autoclose>
	<div class="text-center">
		<ExclamationCircleOutline class="mx-auto mb-4 h-12 w-12 text-gray-400 dark:text-gray-200" />
		<h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
			Are you sure you want to delete this MilestoneGroup?
		</h3>
		<Button
			color="red"
			class="me-2"
			on:click={() => {
				deleteMilestoneGroup(groupId);
			}}>Yes, I'm sure</Button
		>
		<Button color="alternative">No, cancel</Button>
	</div>
</Modal>
