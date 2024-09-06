import { BasicStore } from '$lib/stores/basicStore';

interface UserData {
	name: string;
	id: string;
	role: string;
	password: string;
	[key: string]: unknown;
}

interface UserList {
	[userID: string]: UserData | string;
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

			// add a flag for login status
			this.store.update((data) => {
				data['loggedIn'] = null;
				return data;
			});
		}
	}

	public async setLoggedIn(flag: string) {
		this.store.update((data) => {
			data['loggedIn'] = flag;
			return data;
		});
	}

	public async getLoggedIn(): Promise<string> {
		return this.get()['loggedIn'];
	}

	public async fetchWithCredentials(
		username: string,
		userpw: string
	): Promise<UserData | undefined> {
		return Object.values(this.get()).find((userdata) => {
			if (!userdata || userdata === null) {
			} else {
				return userdata.name === username && userdata.password === userpw;
			}
		});
	}
}

const users = new UserStore();

async function createDummyUser(name: string = 'dummyUser') {
	await users.add('dummyUser123', {
		name: name,
		id: 'dummyUser123',
		role: 'admin',
		password: '123'
	});
}

export { createDummyUser, users, UserStore, type UserData, type UserList };
