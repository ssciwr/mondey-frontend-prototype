// @ts-nocheck
export class DropdownDataElement {
	/**
	 * @param {any} name
	 * @param {any} items
	 * @param {any} about
	 */
	constructor(name, items, about) {
		this.items = items.map((item) => ({ value: item, name: item }), items);
		this.name = name;
		this.about = about;
		this.selected = false;
	}
}
