import { writable } from 'svelte/store';

// types
interface ChildrenSurvey {
	[name: string]: unknown;
}

interface RegistrationForms {
	[name: string]: unknown;
}

interface ContentList {
	childrenSurveys: ChildrenSurvey;
	registrationForms: RegistrationForms;
}

const contentlist: ContentList = {
	childrenSurveys: {},
	registrationForms: {}
};

// store that has an object which stores the content.
const content = writable(contentlist);

// functions to add and remove stuff from the store
function addContent(type: string, key: string) {
	content.update((contentlist: ContentList) => {
		contentlist[type as keyof ContentList][key] = content;
		return contentlist;
	});
}

function removeContent(type: string, key: string) {
	content.update((contentlist) => {
		delete contentlist[type as keyof ContentList][key];
		return contentlist;
	});
}

export { addContent, content, removeContent };
