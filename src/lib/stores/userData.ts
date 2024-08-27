import { writable } from 'svelte/store';

// type interfaces
interface PersonalData {
	yearofbirth: number;
	gender: string;
	profession: string;
	education: string;
	workinghours: string;
	householdincome: string;
}

interface ScientistData extends PersonalData {
	project: string;
}

interface AdminData extends PersonalData {
	admintoken: string;
}

interface UserData {
	role: string;
	email: string;
	name: string;
	token: string;
	password: string;
	data: PersonalData | ScientistData | AdminData;
}

interface UserList {
	[key: string]: UserData;
}

// Initial user data
const userlist: UserList = {};

const users = writable(userlist);

// functions to add and delete users
async function addUser(userToken: string, userData: UserData) {
	users.update((userlist) => {
		if (userToken in userlist) {
			// raise some error
		} else {
			userData['token'] = userToken;
			userlist[userToken] = userData;
		}
		return userlist;
	});
}

async function removeUser(userToken: string) {
	users.update((userlist) => {
		if (userToken in userlist) {
			delete userlist[userToken];
		}
		return userlist;
	});
}

export { addUser, removeUser, users };
