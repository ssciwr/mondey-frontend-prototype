<script lang="ts">
	import { Input, Select, Label } from 'flowbite-svelte';
	export let data;
	export let lang_id;
	export let answer = '';

	function parse_options_json(options_json) {
		try {
			return JSON.parse(data.text[lang_id].options_json);
		} catch (e) {
			console.log("Couldn't parse options_json");
			console.log(e);
		}
		return [];
	}

	$: items = parse_options_json(data.text[lang_id].options_json);
</script>

<div class="mb-5">
	<Label class="font-semibold text-gray-700 dark:text-gray-400">{data.text[lang_id].question}</Label
	>
</div>
<div class="mb-5">
	{#if data.input === 'select'}
		<Select {items} bind:value={answer} placeholder="" />
	{:else}
		<Input type="text" bind:value={answer} />
	{/if}
</div>
