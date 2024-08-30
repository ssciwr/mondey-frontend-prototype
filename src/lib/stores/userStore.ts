import { browser } from '$app/environment';
import { get, writable } from 'svelte/store';

interface UserData {
	name: string;
	id: string;
	role: string;
	[key: string]: unknown;
}

interface UserList {
	[userID: string]: UserData;
}

const users = writable({} as UserList);

async function clear() {
	if (browser) {
		localStorage.clear();
	}
}

async function save() {
	let userlist = {};

	if (browser) {
		const stored = localStorage.getItem('users');
		userlist = stored ? JSON.parse(stored) : {};
	}
	users.set(userlist);
}
async function load() {
	if (browser) {
		localStorage.setItem('children', JSON.stringify(get(users)));
	}
}

async function addUser(userID: string, userData: UserData) {
	users.update((userlist) => {
		if (userID in userlist) {
			throw new Error(`User ${userID} already exists`);
		}

		userlist[userID] = userData;
		return userlist;
	});
}

async function removeUser(userID: string) {
	users.update((userlist) => {
		if (!(userID in userlist)) {
			throw new Error(`User ${userID} doesn't exist`);
		}

		delete userlist[userID];

		return userlist;
	});
}

async function fetchUser(userID: string): Promise<UserData> {
	const userlist = get(users);

	if (!(userID in userlist)) {
		throw new Error(`User ${userID} doesn't exist`);
	}
	return userlist[userID];
}

async function updateUser(userID: string, userdata: UserData) {
	users.update((userlist) => {
		if (!(userID in userlist)) {
			throw new Error(`User ${userID} doesn't exist`);
		}

		userlist[userID] = userdata;
		return userlist;
	});
}

export { addUser, clear, fetchUser, load, removeUser, save, updateUser, users };
