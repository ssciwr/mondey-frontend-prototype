<script>
	export class DropdownData {
		constructor(items, name) {
			this.items = items;
			this.name = name;
			this.selected = false;
		}
	}

	export let dropdownData = [
		new DropdownData([1, 2, 3], 'numbers'),
		new DropdownData(['a', 'b', 'c'], 'letters'),
		new DropdownData(['lamb', 'fox', 'lion'], 'animals')
	];
</script>

<div>
	{#each dropdownData as dropdown}{/each}
</div>
