import { writable, type Writable } from 'svelte/store';
import type { GetLanguagesResponse } from '$lib/client/types.gen';

export const isLoggedIn = writable(false);

export const milestoneGroups = writable([]);

export const userQuestions = writable([]);

export const languages: Writable<GetLanguagesResponse> = writable({});

export const lang_id = writable('1');
