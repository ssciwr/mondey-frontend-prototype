import { get, writable } from 'svelte/store';

// README: this API is experimental and not by any means a final design

// Types
interface ObservationData {
	summary: object;
	current: object;
}

interface ChildData {
	name: string;
	id: string;
	[key: string]: unknown;
}

interface ChildObject {
	childData: ChildData;
	observationData: ObservationData | null;
}

interface ChildrenList {
	[usertoken: string]: {
		[childtoken: string]: ChildObject;
	};
}

// store itself: README:
const childrenlist: ChildrenList = {};

const children = writable(childrenlist);

async function addUser(usertoken: string) {
	children.update((childrenlist) => {
		if (usertoken in childrenlist) {
			throw new Error(`User token ${usertoken} already exists`);
		}

		childrenlist[usertoken] = {};

		return childrenlist;
	});
}

async function addChildData(usertoken: string, childtoken: string, data: ChildData) {
	// /API calls/ fetch requests could go here.

	children.update((childrenlist) => {
		if (!(usertoken in childrenlist)) {
			throw new Error(`User token ${usertoken} not found`);
		}

		if (childtoken in childrenlist[usertoken]) {
			throw new Error(`Child token ${childtoken} already exists for user token ${usertoken}`);
		}

		childrenlist[usertoken][childtoken] = { childData: data, observationData: null };

		return childrenlist;
	});
}

async function addChildObservation(
	usertoken: string,
	childtoken: string,
	observationData: ObservationData
) {
	children.update((childrenlist) => {
		if (!(usertoken in childrenlist)) {
			throw new Error(`User token ${usertoken} not found`);
		}

		if (!(childtoken in childrenlist[usertoken])) {
			throw new Error(`Child token ${childtoken} does not exist for user token ${usertoken}`);
		}

		childrenlist[usertoken][childtoken].observationData = observationData;

		return childrenlist;
	});
}

async function removeChildData(usertoken: string, childtoken: string) {
	// /API calls/ fetch requests could go here.

	children.update((childrenlist) => {
		if (!(usertoken in childrenlist)) {
			throw new Error(`User token ${usertoken} not found`);
		}

		if (!(childtoken in childrenlist[usertoken])) {
			throw new Error(`Child token ${childtoken} not found for user token ${usertoken}`);
		}

		delete childrenlist[usertoken][childtoken];

		return childrenlist;
	});
}

async function fetchChildData(usertoken: string, childtoken: string) {
	// /API calls/ fetch requests could go here.
	const contentData = get(children);

	if (!(usertoken in contentData)) {
		throw new Error('No such user in the childrenstore');
	}

	if (!(childtoken in contentData[usertoken as keyof ChildrenList])) {
		throw new Error('No such child in the childrenstore for user ' + usertoken);
	}

	return contentData[usertoken as keyof ChildrenList][childtoken].childData;
}

async function fetchObservationData(usertoken: string, childtoken: string) {
	// /API calls/ fetch requests could go here.
	const contentData = get(children);

	if (!(usertoken in contentData)) {
		throw new Error('No such user in the childrenstore');
	}

	if (!(childtoken in contentData[usertoken as keyof ChildrenList])) {
		throw new Error('No such child in the childrenstore for user ' + usertoken);
	}

	return contentData[usertoken as keyof ChildrenList][childtoken].observationData;
}

async function fetchChildrenDataforUser(usertoken: string) {
	const contentData = get(children);

	if (!(usertoken in contentData)) {
		throw new Error('No such user in the childrenstore');
	}

	// sort them alphabetically
	return Object.keys(contentData[usertoken])
		.map((child) => {
			return contentData[usertoken][child].childData;
		})
		.sort((a, b) => a.name.localeCompare(b.name));
}
async function fetchObservationDataForUser(usertoken: string) {
	const contentData = get(children);
	if (!(usertoken in contentData)) {
		throw new Error('No such user in the childrenstore');
	}

	return Object.keys(contentData[usertoken]).map((child) => {
		return [child, contentData[usertoken][child].observationData];
	});
}

// --> README:
// hardcode dummy child data which later will live in the database on the server and be fetched from there via API calls
// the stuff below is therefore temporary and is an approximation of the datastructure that may be returned perhaps from the backend,
// and thus is subject to change

function getRandomInt(max: number) {
	return Math.floor(Math.random() * max);
}

function chooseRandom(values: string[]) {
	return values[getRandomInt(values.length)];
}

async function createDummyData() {
	const values = ['good', 'warn', 'bad'];
	const dates = [
		'05-11-2017',
		'08-05-2016',
		'22-07-2012',
		'11-11-2020',
		'30-03-2019',
		'01-06-2022',
		'30-12-2021',
		'30-11-2021',
		'30-10-2021'
	];
	const surveys: string[] = ['surveyA', 'surveyB', 'surveyC', 'surveyD', 'surveyE'];

	const summary: {
		[key: string]: {
			[key: string]: string;
		};
	} = {};

	for (const s of surveys) {
		summary[s] = {};

		for (const date of dates) {
			summary[s][date] = chooseRandom(values);
		}
	}

	const current: { [survey: string]: { name: string; status: string }[] } = {};

	const milestones = ['milestoneA', 'milestoneB', 'milestoneC', 'milestoneD', 'milestoneE'];
	const completionValues = ['done', 'open', 'incomplete'];

	for (const survey of surveys) {
		current[survey] = [];
		for (const milestone of milestones) {
			current[survey].push({
				name: milestone,
				status: chooseRandom(completionValues)
			});
		}
	}

	const dummyObservationData = {
		summary: summary,
		current: current
	};
	
	await addUser('dummyUser');

	await addChildData('dummyUser', 'childAnna', {
		name: 'Anna',
		id: 'childAnna',
		image: 'child_avatar.png',
		info: 'A child that is making a mess and is doing good. Click to view more.'
	});
	await addChildObservation('dummyUser', 'childAnna', dummyObservationData);

	await addChildData('dummyUser', 'childBen', {
		name: 'Ben',
		id: 'childBen',
		image: 'child_avatar.png',
		info: 'A child that is making a mess and is doing good. Click to view more.'
	});
	await addChildObservation('dummyUser', 'childBen', dummyObservationData);

	await addChildData('dummyUser', 'childC', {
		name: 'C',
		id: 'childC',
		image: 'children.png',
		info: 'A child that is making a mess and is doing good. Click to view more.'
	});
	await addChildObservation('dummyUser', 'childC', dummyObservationData);

	await addChildData('dummyUser', 'childDora', {
		name: 'Dora',
		id: 'childDora',
		image: 'children.png',
		info: 'A child that is making a mess and is doing good. Click to view more.'
	});
	await addChildObservation('dummyUser', 'childDora', dummyObservationData);

	await addChildData('dummyUser', 'childE', {
		name: 'E',
		id: 'childE',
		image: 'children.png',
		info: 'A child that is making a mess and is doing good. Click to view more.'
	});
	await addChildObservation('dummyUser', 'childE', dummyObservationData);

	await addChildData('dummyUser', 'childF', {
		name: 'F',
		id: 'childF',
		image: 'children.png',
		info: 'A child that is making a mess and is doing good. Click to view more.'
	});
	await addChildObservation('dummyUser', 'childF', dummyObservationData);
}

// <--

export {
	addChildData,
	addChildObservation,
	addUser,
	children,
	createDummyData,
	fetchChildData,
	fetchChildrenDataforUser,
	fetchObservationData,
	fetchObservationDataForUser,
	removeChildData,
	type ChildData,
	type ChildObject,
	type ChildrenList,
	type ObservationData
};
