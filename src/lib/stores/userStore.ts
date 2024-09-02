import { BasicStore } from '$lib/stores/basicStore';

interface UserData {
	name: string;
	id: string;
	role: string;
	password: string;
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

async function createDummyUser() {
	await users.add('1', {
		name: 'John Doe',
		id: '1',
		role: 'admin',
		password: '123'
	});
}

export { createDummyUser, users, UserStore, type UserData, type UserList };
