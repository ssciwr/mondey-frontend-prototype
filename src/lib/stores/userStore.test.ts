import { get } from 'svelte/store';
import { describe, expect, it } from 'vitest';
import { addUser, removeUser, type UserData, users } from './userStore';

describe('test_normal_function', () => {
	const mockUserToken = 'mockUserToken';
	const mockUserData: UserData = {
		role: 'mockRole',
		email: 'mockEmail',
		name: 'mockName',
		token: '',
		password: 'mockPassword',
		data: {
			yearofbirth: 1990,
			gender: 'male',
			profession: 'developer',
			education: 'bachelor',
			workinghours: 'full-time',
			householdincome: 'above-average'
		}
	};

	it('should add a new user successfully', async () => {
		users.set({});

		await addUser(mockUserToken, mockUserData);

		expect(get(users)[mockUserToken]).toEqual({
			...mockUserData,
			token: mockUserToken
		});
	});

	it('should not add a user with an existing token', async () => {
		users.set({ mockUserToken: mockUserData });

		try {
			await addUser(mockUserToken, mockUserData);
		} catch (error: Error | unknown) {
			expect((error as Error).message).toBe('User with this token already exists');
		}
	});

	it('should remove a user successfully', async () => {
		users.set({ mockUserToken: mockUserData });

		await removeUser(mockUserToken);

		expect(get(users)[mockUserToken]).toBeUndefined();
	});

	it('should not remove a user with a non-existing token', async () => {
		users.set({ mockUserToken: mockUserData });

		try {
			await removeUser('notdefined');
		} catch (error: Error | unknown) {
			expect((error as Error).message).toBe('User with this token does not exist');
		}
	});
});
