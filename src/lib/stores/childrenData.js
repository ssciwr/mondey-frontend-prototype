import { writable } from 'svelte/store';

let childrenlist = {};

const childrenData = writable(childrenlist);

function addChildrenData(data, usertoken) {}

function removeChildrenData(usertoken) {}

export { addChildrenData, childrenData, removeChildrenData };
