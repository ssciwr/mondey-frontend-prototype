<script lang="ts">
	import { Button } from 'flowbite-svelte';
	import EditOutline from 'flowbite-svelte-icons/EditOutline.svelte';
	import { _ } from 'svelte-i18n';

	export let onClick: () => void;
</script>

<Button color="yellow" on:click={onClick}
	><EditOutline class="me-2 h-5 w-5" /> {$_('admin.edit')}</Button
>
