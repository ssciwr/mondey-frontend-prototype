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
		console.log('set login to: ', flag);
		this.store.update((data) => {
			data['loggedIn'] = flag;
			return data;
		});
	}

	public async getLoggedIn(): Promise<string> {
		console.log('trying to get login');
		return this.get()['loggedIn'];
	}

	public async fetchWithCredentials(
		username: string,
		userpw: string
	): Promise<UserData | string | undefined> {
		console.log('Fetching with credentials', username);
		return Object.values(this.get()).find((userdata) => {
			if (userdata && userdata !== null) {
				return userdata.name === username && userdata.password === userpw;
			} else {
				return false;
			}
		});
	}
}

const users = new UserStore();

async function createDummyUser(name: string = 'dummyUser') {
	console.log('Creating dummy user');
	const h = await hash('123');
	await users.add('dummyUser' + h, {
		name: name,
		id: 'dummyUser' + h,
		role: 'admin',
		password: h
	});
}

async function hash(input: string): string {
	console.log('hash input');
	const encoder = new TextEncoder();
	const data = encoder.encode(input);
	const hashArray = Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256', data)));
	const hash = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
	return hash;
}

export { createDummyUser, hash, users, UserStore, type UserData, type UserList };
