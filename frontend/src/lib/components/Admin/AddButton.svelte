<script lang="ts">
	import { Button } from 'flowbite-svelte';
	import PlusOutline from 'flowbite-svelte-icons/PlusOutline.svelte';
	import { _ } from 'svelte-i18n';

	export let onClick: () => void;
	export let disabled: boolean = false;
</script>

<Button color="blue" {disabled} on:click={onClick}
	><PlusOutline class="me-2 h-5 w-5" /> {$_('admin.add')}</Button
>
