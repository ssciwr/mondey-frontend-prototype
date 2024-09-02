<script lang="ts">
	import { Checkbox } from 'flowbite-svelte';
	export let cls: string = '';
	export let checked: boolean = false;
</script>

<div class={'container mx-auto flex w-full max-w-md items-start' + cls}>
	<Checkbox bind:checked>Remember me</Checkbox>
	<a
		href="/userLand/lostPassword"
		class="ms-auto text-primary-700 hover:underline dark:text-primary-500"
	>
		Lost password?
	</a>
</div>
