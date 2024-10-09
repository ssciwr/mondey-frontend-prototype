import { writable, type Writable } from 'svelte/store';
import type {
	GetLanguagesResponse,
	MilestoneGroupAdmin,
	UserQuestionAdmin
} from '$lib/client/types.gen';

export const milestoneGroups: Writable<Array<MilestoneGroupAdmin>> = writable([]);

export const userQuestions: Writable<Array<UserQuestionAdmin>> = writable([]);

export const languages: Writable<GetLanguagesResponse> = writable({});

export const lang_id = writable('1');
