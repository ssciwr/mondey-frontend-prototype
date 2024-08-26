import { writable } from 'svelte/store';

let childrenlist = {};

const childrenData = writable(childrenlist);

async function addChildrenData(data, usertoken) {
	childrenData.update((childrenlist) => {
		if (usertoken in childrenlist) {
			childrenlist[usertoken] = data;
		} else {
			childrenlist[usertoken] = {};
			childrenlist[usertoken][data.token] = data;
		}
	});
}

async function removeChildrenData(usertoken, childtoken) {
	childrenData.update((childrenlist) => {
		if (usertoken in childrenlist) {
			delete childrenlist[usertoken][childtoken];
		}
	});
}

export { addChildrenData, childrenData, removeChildrenData };
