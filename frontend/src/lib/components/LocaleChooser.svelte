<script lang="ts">
	import { Dropdown, DropdownItem } from 'flowbite-svelte';
	import { ChevronDownOutline } from 'flowbite-svelte-icons';
	import { locale, locales } from 'svelte-i18n';
	let dropdownOpen = false;
</script>

<div class="flex">
	<button id="locale-button" class="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-500 bg-gray-100 rounded-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600" type="button">
		{$locale}
		<ChevronDownOutline class="w-6 h-6 ms-2" />
	</button>
	<Dropdown triggeredBy="#locale-button" bind:open={dropdownOpen}>
		{#each $locales as loc}
			<DropdownItem class="flex items-center" on:click={() => {locale.set(loc); dropdownOpen = false}}>
				{loc}
			</DropdownItem>
		{/each}
	</Dropdown>
</div>