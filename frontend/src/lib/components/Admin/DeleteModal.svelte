<script lang="ts">
	import { Button, Modal } from 'flowbite-svelte';
	import { ExclamationCircleOutline } from 'flowbite-svelte-icons';
	import { _ } from 'svelte-i18n';

	export let open: boolean;
	export let onClick: () => void;
</script>

<Modal bind:open size="xs" autoclose>
	<div class="text-center">
		<ExclamationCircleOutline class="mx-auto mb-4 h-12 w-12 text-gray-400 dark:text-gray-200" />
		<h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
			{$_('admin.delete-are-you-sure')}
		</h3>
		<Button color="red" class="me-2" on:click={onClick}>
			{$_('admin.yes-sure')}
		</Button>
		<Button color="alternative">{$_('admin.no-cancel')}</Button>
	</div>
</Modal>
