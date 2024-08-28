import { get, writable } from 'svelte/store';

// types
interface MilestoneDef {
	name: string;
	items: string[];
	label: string;
}

interface ContentNode {
	milestones: MilestoneDef[];
	description: string;
	last: string | null;
	next: string | null;
}

interface ContentList {
	[name: string]: ContentNode;
}

const contentlist: ContentList = {};

// store that has an object which stores the content.
const content = writable(contentlist);

// functions to add and remove stuff from the store
async function addContent(key: string, new_content: ContentNode) {
	content.update((contentlist: ContentList) => {
		if (key in contentlist) {
			throw new Error('Key already exists in the contentstore');
		}
		contentlist[key] = new_content;
		return contentlist;
	});
}

async function removeContent(key: string) {
	content.update((contentlist) => {
		if (!(key in contentlist)) {
			throw new Error('No such key in the contentstore');
		}
		delete contentlist[key];
		return contentlist;
	});
}

async function fetchContent(key: string) {
	const contentData = get(content);

	if (!(key in contentData)) {
		throw new Error('No such key in the contentstore');
	}

	return contentData[key];
}

function getSurveyNumber() {
	const contentData = get(content);
	return Object.keys(contentData).length;
}

async function createDummyData() {
	const dummySurveys = {
		surveyA: {
			description: 'This is the first survey called A',
			milestones: [
				{
					name: 'Standing up',
					items: ['not at all', 'to some extend', 'mostly', 'reliably'],
					label:
						'How well can the child stand up from sitting or crawling around and how readily is it able to do so'
				},
				{
					name: 'Gripping a pen the right way',
					items: ['not at all', 'to some extend', 'mostly', 'reliably'],
					label: 'How well can the child hold a pen or pencil and how coordinated can it use it'
				},
				{
					name: 'Talking in full sentences',
					items: ['not at all', 'to some extend', 'mostly', 'reliably'],
					label:
						'How well articulated is the child in its speech and how well can it express itself'
				}
			],
			last: null,
			next: 'surveyB'
		},
		surveyB: {
			description: 'This is another survey called B',
			milestones: [
				{
					name: 'Standing up',
					label: 'How well can the child hold a pen or pencil and how coordinated can it use it',
					items: ['not at all', 'to some extend', 'mostly', 'reliably']
				},
				{
					name: 'Gripping a pen the right way',
					items: ['not at all', 'to some extend', 'mostly', 'reliably'],
					label: 'How well can the child hold a pen or pencil and how coordinated can it use it'
				},
				{
					name: 'Talking in full sentences',
					items: ['not at all', 'to some extend', 'mostly', 'reliably'],
					label:
						'How well articulated is the child in its speech and how well can it express itself'
				},
				{
					name: 'Counting to 10',
					items: ['not at all', 'to some extend', 'mostly', 'reliably'],
					label:
						'How well can the child count to 10 and how well does it understand numbers within that range'
				}
			],
			last: 'surveyA',
			next: 'surveyC'
		},
		surveyC: {
			description: 'This is another survey called C',
			milestones: [
				{
					name: 'Solving a shape-sorting toy',
					items: ['not at all', 'to some extend', 'mostly', 'reliably'],
					label: 'How well can the child solve a shape-sorting toy'
				},
				{
					name: 'Counting to 10',
					items: ['not at all', 'to some extend', 'mostly', 'reliably'],
					label:
						'How well can the child count to 10 and how well does it understand numbers within that range'
				}
			],
			last: 'surveyB',
			next: null
		}
	};

	content.set(dummySurveys);
}

export {
	addContent,
	content,
	createDummyData,
	fetchContent,
	getSurveyNumber,
	removeContent,
	type ContentList,
	type ContentNode,
	type MilestoneDef
};
