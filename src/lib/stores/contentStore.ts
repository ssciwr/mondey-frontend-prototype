import { get, writable } from 'svelte/store';

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
		if (!(type in contentlist)) {
			throw new Error('No such register in the contentstore');
		}

		if (key in contentlist[type as keyof ContentList]) {
			throw new Error('Key already exists in the contentstore');
		}
		contentlist[type as keyof ContentList][key] = new_content;
		return contentlist;
	});
}

async function removeContent(type: string, key: string) {
	content.update((contentlist) => {
		if (!(type in contentlist)) {
			throw new Error('No such register in the contentstore');
		}
		if (!(key in contentlist[type as keyof ContentList])) {
			throw new Error('No such key in the contentstore');
		}
		delete contentlist[type as keyof ContentList][key];
		return contentlist;
	});
}

async function fetchContent(type: string, key: string) {
	const contentData = get(content);
	if (!(type in contentData)) {
		throw new Error('No such register in the contentstore');
	}

	if (!(key in contentData[type as keyof ContentList])) {
		throw new Error('No such key in the contentstore');
	}

	return contentData[type as keyof ContentList][key];
}

export {
	addContent,
	content,
	fetchContent,
	removeContent,
	type ChildrenSurvey,
	type ContentList,
	type RegistrationForm
};
