import { get } from 'svelte/store';
import { describe, expect, it } from 'vitest';
import {
	addChildData,
	children,
	removeChildData,
	type ChildData,
	type ChildrenList
} from './childrenStore';

describe('normal functionality', () => {
	const mockChildData: ChildData = {
		name: 'foo',
		age: 3,
		nationality: 'turkish'
	};
	const mockChildData2: ChildData = {
		name: 'bar',
		age: 5,
		nationality: 'german'
	};

	const mockChildData3: ChildData = {
		name: 'baz',
		age: 2,
		nationality: 'british'
	};

	const mockChildList: ChildrenList = {
		alpha: {
			childA: mockChildData,
			childB: mockChildData2
		},
		beta: {
			childA: mockChildData
		}
	};

	it('should add child successfully', async () => {
		children.set(mockChildList);
		await addChildData(mockChildData3, 'alpha', 'childC');

		expect(get(children)['alpha']['childC']).toEqual(mockChildData3);
	});

	it('should remove child successfully', async () => {
		children.set(mockChildList);
		await removeChildData('beta', 'childA');
		expect(get(children)['beta']['childA']).toEqual(undefined);
	});

	it('should throw when adding with nonexistant user or existing child key', async () => {
		children.set(mockChildList);
		try {
			await addChildData(mockChildData3, 'alpha', 'childA');
		} catch (error: Error | unknown) {
			expect((error as Error).message).toBe(
				'Child token childA already exists for user token alpha'
			);
		}

		try {
			await addChildData(mockChildData3, 'x', 'childA');
		} catch (error: Error | unknown) {
			expect((error as Error).message).toBe('User token x not found');
		}
	});

	it('should throw when adding with nonexistant user or existing child key', async () => {
		children.set(mockChildList);
		try {
			await removeChildData('x', 'childA');
		} catch (error: Error | unknown) {
			expect((error as Error).message).toBe('User token x not found');
		}

		try {
			await removeChildData('alpha', 'notthere');
		} catch (error: Error | unknown) {
			expect((error as Error).message).toBe('Child token notthere not found for user token alpha');
		}
	});
});
