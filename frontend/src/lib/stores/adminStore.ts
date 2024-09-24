import { writable } from 'svelte/store';

export const isLoggedIn = writable(false);

export const milestoneGroups = writable([]);

export const languages = writable({});

export const lang_id = writable('1');
