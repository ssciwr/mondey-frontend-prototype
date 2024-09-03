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
	static _instance: UserStore;

	constructor(name: string = 'users') {
		if (UserStore._instance) {
			throw new Error('Singleton classes cannot be instantiated more than once.');
		} else {
			super(name, 'users');
			UserStore._instance = this;
		}
	}
}
const users = new UserStore();
export { users, UserStore, type UserData, type UserList };
