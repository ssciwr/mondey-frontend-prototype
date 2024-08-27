import { get } from 'svelte/store';
import { describe, expect, it } from 'vitest';
import {
	addChildData,
	children,
	removeChildData,
	type ChildObject,
	type ChildrenList,
	type ObservationData
} from './childrenStore';

describe('normal functionality', () => {
	const mockObservationData: ObservationData = {
		current: ['a', 'b', 'c'],
		summary: ['x', 'y']
	};

	const mockChildData: ChildObject = {
		childData: {
			name: 'foo',
			age: 3,
			nationality: 'turkish'
		},
		observationData: mockObservationData
	};
	const mockChildData2: ChildObject = {
		childData: {
			name: 'bar',
			age: 5,
			nationality: 'german'
		},
		observationData: mockObservationData
	};

	const mockChildData3: ChildObject = {
		childData: {
			name: 'baz',
			age: 2,
			nationality: 'british'
		},
		observationData: mockObservationData
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
		await addChildData('alpha', 'childC', mockChildData3.childData);
		expect(get(children)['alpha']['childC'].childData).toEqual(mockChildData3.childData);
	});

	it('should remove child successfully', async () => {
		children.set(mockChildList);
		await removeChildData('beta', 'childA');
		expect(get(children)['beta']['childA']).toEqual(undefined);
	});

	it('should throw when adding with nonexistant user or existing child key', async () => {
		children.set(mockChildList);
		try {
			await addChildData('alpha', 'childA', mockChildData3.childData);
		} catch (error: Error | unknown) {
			expect((error as Error).message).toBe(
				'Child token childA already exists for user token alpha'
			);
		}

		try {
			await addChildData('x', 'childA', mockChildData3.childData);
		} catch (error: Error | unknown) {
			expect((error as Error).message).toBe('User token x not found');
		}
	});

	it('should throw when removing with nonexistant user or nonexisting child key', async () => {
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
