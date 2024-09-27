import { writable, type Writable } from 'svelte/store';

export const isLoggedIn = writable(false);

export const milestoneGroups = writable([]);

export const languages: Writable<Record<string, string>> = writable({});

export const lang_id = writable('1');
