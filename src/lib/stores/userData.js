// @ts-nocheck
import { writable } from 'svelte/store';

// FIXME: there must be something that is used to validate input - prototype for user data or so.
// this will eventually go into the backend, but for now it must reside here.

let userlist = {};

const users = writable(userlist);

async function addUser(userToken, userData) {
	users.update((userlist) => {
		if (userToken in userlist) {
			// raise some error
		} else {
			userData['token'] = userToken;
			userlist[userToken] = userData;
		}
	});
}

async function removeUser(userToken) {
	users.update((userlist) => {
		if (userToken in userlist) {
			delete userlist[userToken];
		}
	});
}

export { addUser, removeUser, users };
