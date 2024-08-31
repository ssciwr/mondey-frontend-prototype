import { BasicStore } from '$lib/stores/basicStore';

interface UserData {
	name: string;
	id: string;
	role: string;
	[key: string]: unknown;
}

interface UserList {
	[userID: string]: UserData;
}

/**
 * UserStore Derived class for Users from basicStore.
 */
class UserStore extends BasicStore<UserList> {
	constructor(name: string = 'users') {
		super(name, 'users');
	}
}
const users = new UserStore();
export { users, UserStore, type UserData, type UserList };
