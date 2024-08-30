import { basicStore } from '$lib/stores/basicStore';

interface UserData {
	name: string;
	id: string;
	role: string;
	[key: string]: unknown;
}

interface UserList {
	[userID: string]: UserData;
}

class UserStore extends basicStore<UserList> {
	constructor(name: string = 'users') {
		super(name, 'users');
	}
}

export { UserStore, type UserData, type UserList };
