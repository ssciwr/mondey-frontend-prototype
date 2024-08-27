import { writable } from 'svelte/store';

interface ChildData {
	[key: string]: string[] | string;
}

interface ChildrenList {
	[usertoken: string]: {
		[childtoken: string]: ChildData;
	};
}

const childrenlist: ChildrenList = {};

const childrenData = writable(childrenlist);

async function addChildData(data: ChildData, childtoken: string, usertoken: string) {
	childrenData.update((childrenlist) => {
		if (!(usertoken in childrenlist)) {
			throw new Error(`User token ${usertoken} not found`);
		}

		if (!(childtoken in childrenlist[usertoken])) {
			throw new Error(`Child token ${childtoken} not found for user token ${usertoken}`);
		}

		data['token'] = usertoken;
		if (usertoken in childrenlist) {
			childrenlist[usertoken][childtoken] = data;
		} else {
			childrenlist[usertoken][childtoken] = data;
		}
		return childrenlist;
	});
}

async function removeChildData(childtoken: string, usertoken: string) {
	childrenData.update((childrenlist) => {
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

export { addChildData, childrenData, removeChildData };
