<script lang="ts">
	import { Checkbox } from 'flowbite-svelte';
	export let cls: String = '';
</script>

<div class={'container mx-auto flex w-full max-w-md items-start' + cls}>
	<Checkbox>Remember me</Checkbox>
	<a href="/" class="ms-auto text-primary-700 hover:underline dark:text-primary-500">
		Lost password?
	</a>
</div>
