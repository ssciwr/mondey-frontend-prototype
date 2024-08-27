import { get } from 'svelte/store';
import { describe, expect, it } from 'vitest';
import {
	addContent,
	content,
	removeContent,
	type ChildrenSurvey,
	type ContentList,
	type RegistrationForm
} from './contentStore';

describe('test_normal_functionality', async () => {
	const mockChildSurvey: ChildrenSurvey = {
		can_do_this: 'incomplete',
		can_do_that: 'fully',
		can_do_the_other: 'no'
	};

	const mockRegistrationForm: RegistrationForm = {
		name: 'Tom',
		gender: 'male'
	};

	const mockContentList: ContentList = {
		childrenSurveys: {
			testsurvey: mockChildSurvey
		},
		registrationForms: {
			testregistration: mockRegistrationForm
		}
	};

	it('should add content successfully when key is not yet there', async () => {
		content.set(mockContentList);

		await addContent('childrenSurveys', 'dummySurvey', mockChildSurvey);
		await addContent('registrationForms', 'childRegistration', mockRegistrationForm);

		expect(get(content)['childrenSurveys']['dummySurvey']).toEqual(mockChildSurvey);
		expect(get(content)['registrationForms']['childRegistration']).toEqual(mockRegistrationForm);
	});

	it('should remove content from the contentstore successfully', async () => {
		content.set(mockContentList);
		console.log(get(content));
		await removeContent('childrenSurveys', 'testsurvey');
		await removeContent('registrationForms', 'childRegistration');

		expect(get(content)['childrenSurveys']['testsurvey']).toBeUndefined();
		expect(get(content)['registrationForms']['childRegistration']).toBeUndefined();
	});

	it('throw error when removing an element with an existing key', async () => {
		content.set(mockContentList);

		try {
			await removeContent('childrenSurveys', 'notthere');
		} catch (error: Error | unknown) {
			expect((error as Error).message).toBe('No such key in the contentstore');
		}
	});

	it('throw error when adding an element with an already present key', async () => {
		content.set(mockContentList);

		try {
			await addContent('childrenSurveys', 'testsurvey', mockChildSurvey);
		} catch (error: Error | unknown) {
			expect((error as Error).message).toBe('No such key in the contentstore');
		}
	});
});
