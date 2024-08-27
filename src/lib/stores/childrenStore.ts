import { writable } from 'svelte/store';

interface ChildData {
	[key: string]: unknown;
}

interface ChildrenList {
	[usertoken: string]: {
		[childtoken: string]: ChildData;
	};
}

const childrenlist: ChildrenList = {};

const children = writable(childrenlist);

async function addChildData(data: ChildData, usertoken: string, childtoken: string) {
	children.update((childrenlist) => {
		if (!(usertoken in childrenlist)) {
			throw new Error(`User token ${usertoken} not found`);
		}

		if (childtoken in childrenlist[usertoken]) {
			throw new Error(`Child token ${childtoken} already exists for user token ${usertoken}`);
		}
		childrenlist[usertoken][childtoken] = data;

		return childrenlist;
	});
}

async function removeChildData(usertoken: string, childtoken: string) {
	children.update((childrenlist) => {
		if (!(usertoken in childrenlist)) {
			throw new Error(`User token ${usertoken} not found`);
		}

		if (!(childtoken in childrenlist[usertoken])) {
			throw new Error(`Child token ${childtoken} not found for user token ${usertoken}`);
		}

		delete childrenlist[usertoken][childtoken];

		return childrenlist;
	});
}

export { addChildData, children, removeChildData, type ChildData, type ChildrenList };
