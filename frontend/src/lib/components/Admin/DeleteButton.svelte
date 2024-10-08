<script lang="ts">
	import { Button } from 'flowbite-svelte';
	import TrashBinOutline from 'flowbite-svelte-icons/TrashBinOutline.svelte';
	import { _ } from 'svelte-i18n';

	export let onClick: () => void;
</script>

<Button color="red" on:click={onClick}
	><TrashBinOutline class="me-2 h-5 w-5" /> {$_('admin.delete')}</Button
>
