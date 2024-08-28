import { get } from 'svelte/store';
import { describe, expect, it } from 'vitest';
import {
	addContent,
	content,
	removeContent,
	type ContentList,
	type MilestoneDef
} from './contentStore';

describe('test_normal_functionality', async () => {
	const mockChildSurvey: MilestoneDef = {
		name: 'dummy',
		label: 'dummy description',
		items: ['dummy1', 'dummy2', 'dummy3', 'dummy4']
	};

	const mockContentList: ContentList = {
		A: {
			milestones: [mockChildSurvey, mockChildSurvey, mockChildSurvey],
			description: 'nothing to be seen here',
			last: '/',
			next: 'B'
		},
		B: {
			milestones: [mockChildSurvey, mockChildSurvey, mockChildSurvey],
			description: 'nothing to be seen here',
			last: 'A',
			next: 'C'
		},
		C: {
			milestones: [mockChildSurvey, mockChildSurvey, mockChildSurvey],
			description: 'nothing to be seen here',
			last: 'B',
			next: '/'
		}
	};

	it('should add content successfully when key is not yet there', async () => {
		content.set(mockContentList);
		await addContent('this', {
			milestones: [mockChildSurvey, mockChildSurvey, mockChildSurvey],
			description: 'nothing to be seen here',
			last: '/',
			next: 'B'
		});
		await addContent('that', {
			milestones: [mockChildSurvey, mockChildSurvey, mockChildSurvey],
			description: 'nothing to be seen here',
			last: 'B',
			next: 'C'
		});

		expect(get(content)['this']).toEqual({
			milestones: [mockChildSurvey, mockChildSurvey, mockChildSurvey],
			description: 'nothing to be seen here',
			last: '/',
			next: 'B'
		});
		expect(get(content)['that']).toEqual({
			milestones: [mockChildSurvey, mockChildSurvey, mockChildSurvey],
			description: 'nothing to be seen here',
			last: 'B',
			next: 'C'
		});
	});

	it('should remove content from the contentstore successfully', async () => {
		content.set(mockContentList);
		await removeContent('A');

		expect(get(content)['A']).toBeUndefined();
	});

	it('throw error when removing an element with an existing key', async () => {
		content.set(mockContentList);

		try {
			await removeContent('notthere');
		} catch (error: Error | unknown) {
			expect((error as Error).message).toBe('No such key in the contentstore');
		}
	});

	it('throw error when adding an element with an already present key', async () => {
		content.set(mockContentList);

		try {
			await addContent('A', {
				milestones: [mockChildSurvey, mockChildSurvey, mockChildSurvey],
				description: 'nothing to be seen here',
				last: '/',
				next: 'B'
			});
		} catch (error: Error | unknown) {
			expect((error as Error).message).toBe('Key already exists in the contentstore');
		}
	});
});
