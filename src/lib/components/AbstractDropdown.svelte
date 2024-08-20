<script>
	import { Button, Dropdown, DropdownDivider, DropdownItem } from 'flowbite-svelte';
	import { ChevronDownOutline } from 'flowbite-svelte-icons';

	export class DropdownData {
		constructor(items, name) {
			this.items = items;
			this.name = name;
			this.selected = false;
		}
	}

	export let header = 'dummy dropdown data';
	export const defaultOptions = ['gar nicht', 'ansatzweise', 'weitgehend', 'zuverlässig'];

	export let dropdownData = [
		new DropdownData(defaultOptions, 'standing up'),
		new DropdownData(defaultOptions, 'making a mess'),
		new DropdownData(defaultOptions, 'gripping a pen the right way')
	];

	const style = {
        basic: {}, 
		buttonstyle: {
			button: ,
			icon: ''
		},
		dropdownstyle: {
			item: '',
			dropdown: ''
		}
	};
</script>

<div>
	<h1>{header}</h1>
	{#each dropdownData as dropdown}
		<Button class={style.buttonstyle.button}>{dropdown.name} <ChevronDownOutline /></Button>
		<Dropdown>
			{#each dropdown.items as item}
				<DropdownItem>{item}</DropdownItem>
				<DropdownDivider />
			{/each}
		</Dropdown>
	{/each}
</div>
