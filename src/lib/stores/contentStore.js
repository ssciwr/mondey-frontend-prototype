import { writable } from 'svelte/store';

let contentlist = {
	childrenSurveys: {},
	registrationForms: {}
};

const content = writable(contentlist);

function addContent(type, key, content) {
	content.update((contentlist) => {
		contentlist[type][key] = content;
	});
}

function removeContent(type, key) {
	content.update((contentlist) => {
		delete contentlist[type][key];
	});
}

export { addContent, content, removeContent };
