import { writable } from 'svelte/store';

// types
interface ChildrenSurvey {
	[name: string]: unknown;
}

interface RegistrationForm {
	[name: string]: unknown;
}

interface ContentList {
	childrenSurveys: ChildrenSurvey;
	registrationForms: RegistrationForm;
}

const contentlist: ContentList = {
	childrenSurveys: {},
	registrationForms: {}
};

// store that has an object which stores the content.
const content = writable(contentlist);

// functions to add and remove stuff from the store
async function addContent(
	type: string,
	key: string,
	new_content: ChildrenSurvey | RegistrationForm
) {
	content.update((contentlist: ContentList) => {
		contentlist[type as keyof ContentList][key] = new_content;
		return contentlist;
	});
}

async function removeContent(type: string, key: string) {
	if (!(type in contentlist)) {
		throw new Error('No such register in the contentstore');
	}
	console.log('removeContent', type, key, Object.keys(contentlist));

	console.log('removeContent', type, key, Object.keys(contentlist[type]));

	if (!(key in contentlist[type as keyof ContentList])) {
		throw new Error('No such key in the contentstore');
	}
	content.update((contentlist) => {
		delete contentlist[type as keyof ContentList][key];
		return contentlist;
	});
}

export {
	addContent,
	content,
	removeContent,
	type ChildrenSurvey,
	type ContentList,
	type RegistrationForm
};
