import { browser } from '$app/environment';
import { get, writable, type Writable } from 'svelte/store';

/**
 *
 */
class basicStore<T extends Record<string, unknown>> {
	protected store: Writable<T>;
	protected key: string;
	protected name: string;

	/**
	 *
	 * @param name
	 * @param key
	 */
	constructor(name: string, key: string) {
		this.name = name;
		this.store = writable({} as T);
		this.key = key;
	}

	/**
	 *
	 * @param userID
	 * @param element
	 */
	public async add(userID: string, element: unknown): Promise<void> {
		this.store.update((data: T) => {
			if (userID in data) {
				throw new Error(`User ${userID} already exist`);
			}

			data[userID as keyof T] = element as T[keyof T];

			return data;
		});
	}

	/**
	 *
	 * @param userID
	 * @param element
	 */
	public async update(userID: string, element: unknown): Promise<void> {
		this.store.update((data) => {
			if (!(userID in data)) {
				throw new Error(`User ${userID} doesn't exist`);
			}

			data[userID as keyof T] = element as T[keyof T];
			return data;
		});
	}

	/**
	 *
	 * @param userID
	 */
	public async remove(userID: string): Promise<void> {
		this.store.update((data) => {
			if (!(userID in data)) {
				throw new Error(`User ${userID} doesn't exist`);
			}

			delete data[userID];

			return data;
		});
	}

	/**
	 *
	 * @param userID
	 * @returns
	 */
	public async fetch(userID: string): Promise<unknown> {
		const data = get(this.store);

		if (!(userID in data)) {
			throw new Error(`User ${userID} doesn't exist`);
		}
		return data[userID];
	}

	/**
	 *
	 */
	public async save(): Promise<void> {
		if (browser) {
			localStorage.setItem(this.key, JSON.stringify(get(this.store)));
		}
	}

	/**
	 *
	 */
	public async load(): Promise<void> {
		let data = {};

		if (browser) {
			const stored = localStorage.getItem(this.key);
			data = stored ? JSON.parse(stored) : {};
		}
		this.store.set(data as T);
	}

	/**
	 *
	 */
	public async clear(): Promise<void> {
		if (browser) {
			localStorage.clear();
		}
	}
}

export { basicStore };
