import { get, writable } from 'svelte/store';

interface ObservationData {
	summary: object;
	current: object;
}

interface ChildData {
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
		throw new Error('No such child in the childrenstore for user' + usertoken);
	}

	return contentData[usertoken as keyof ChildrenList][childtoken].observationData;
}

async function fetchChildrenDataforUser(usertoken: string) {
	const contentData = get(children);
	if (!(usertoken in contentData)) {
		throw new Error('No such user in the childrenstore');
	}

	return Object.keys(contentData[usertoken]).map((child) => {
		return contentData[usertoken][child].childData;
	});
}
async function fetchObservationDataForUser(usertoken: string) {
	const contentData = get(children);
	if (!(usertoken in contentData)) {
		throw new Error('No such user in the childrenstore');
	}

	return Object.keys(contentData[usertoken]).map((child) => {
		return contentData[usertoken][child].observationData;
	});
}

// --> README:
// hardcode dummy child data which later will live in the database on the server and be fetched from there via API calls
// the stuff below is therefore temporary and is an approximation of the datastructure that may be returned perhaps from the backend,
// and thus is subject to change
async function createDummyData() {
	const dummyObservationData = {
		summary: {
			surveyA: {
				'05-11-2017': 'good',
				'08-05-2016': 'bad',
				'22-07-2012': 'bad',
				'11-11-2020': 'warn',
				'30-03-2019': 'warn',
				'01-06-2022': 'good',
				'30-12-2021': 'bad',
				'30-11-2021': 'good',
				'30-10-2021': 'good'
			},
			suveryB: {
				'05-11-2017': 'bad',
				'08-05-2016': 'warn',
				'22-07-2012': 'bad',
				'11-11-2020': 'warn',
				'30-03-2019': 'good',
				'01-06-2022': 'bad',
				'30-12-2021': 'good',
				'30-11-2021': 'good',
				'30-10-2021': 'good'
			},
			surveyC: {
				'05-11-2017': 'warn',
				'08-05-2016': 'warn',
				'22-07-2012': 'bad',
				'11-11-2020': 'warn',
				'30-03-2019': 'bad',
				'01-06-2022': 'good',
				'30-12-2021': 'good',
				'30-11-2021': 'good',
				'30-10-2021': 'bad'
			},
			surveyD: {
				'05-11-2017': 'good',
				'08-05-2016': 'good',
				'22-07-2012': 'good',
				'11-11-2020': 'warn',
				'30-03-2019': 'good',
				'01-06-2022': 'good',
				'30-12-2021': 'good',
				'30-11-2021': 'good',
				'30-10-2021': 'good'
			},
			surveyE: {
				'05-11-2017': 'good',
				'08-05-2016': 'warn',
				'22-07-2012': 'warn',
				'11-11-2020': 'warn',
				'30-03-2019': 'good',
				'01-06-2022': 'good',
				'30-12-2021': 'good',
				'30-11-2021': 'warn',
				'30-10-2021': 'good'
			}
		},
		current: {
			surveyA: [
				{ name: 'milestoneA', status: 'done' },
				{ name: 'milestoneB', status: 'open' },
				{ name: 'milestoneC', status: 'open' },
				{ name: 'milestoneD', status: 'incomplete' },
				{ name: 'milestoneE', status: 'done' }
			],
			surveyB: [
				{ name: 'milestoneA', status: 'done' },
				{ name: 'milestoneB', status: 'open' },
				{ name: 'milestoneC', status: 'open' },
				{ name: 'milestoneD', status: 'incomplete' },
				{ name: 'milestoneE', status: 'done' }
			],
			surveyC: [
				{ name: 'milestoneA', status: 'done' },
				{ name: 'milestoneB', status: 'open' },
				{ name: 'milestoneC', status: 'open' },
				{ name: 'milestoneD', status: 'incomplete' },
				{ name: 'milestoneE', status: 'done' }
			]
		}
	};
	await addUser('dummyUser');

	await addChildData('dummyUser', 'childAnna', {
		name: 'Anna',
		image: 'child_avatar.png',
		info: 'A child that is making a mess and is doing good. Click to view more.'
	});
	await addChildObservation('dummyUser', 'childAnna', dummyObservationData);

	await addChildData('dummyUser', 'childBen', {
		name: 'Ben',
		image: 'child_avatar.png',
		info: 'A child that is making a mess and is doing good. Click to view more.'
	});
	await addChildObservation('dummyUser', 'childBen', dummyObservationData);

	await addChildData('dummyUser', 'childC', {
		name: 'C',
		image: 'children.png',
		info: 'A child that is making a mess and is doing good. Click to view more.'
	});
	await addChildObservation('dummyUser', 'childC', dummyObservationData);

	await addChildData('dummyUser', 'childDora', {
		name: 'Dora',
		image: 'children.png',
		info: 'A child that is making a mess and is doing good. Click to view more.'
	});
	await addChildObservation('dummyUser', 'childDora', dummyObservationData);

	await addChildData('dummyUser', 'childE', {
		name: 'E',
		image: 'children.png',
		info: 'A child that is making a mess and is doing good. Click to view more.'
	});
	await addChildObservation('dummyUser', 'childE', dummyObservationData);

	await addChildData('dummyUser', 'childF', {
		name: 'F',
		image: 'children.png',
		info: 'A child that is making a mess and is doing good. Click to view more.'
	});
	await addChildObservation('dummyUser', 'childF', dummyObservationData);
}

// <--

export {
	addChildData,
	addUser,
	children,
	createDummyData,
	fetchChildData,
	fetchChildrenDataforUser,
	fetchObservationData,
	fetchObservationDataForUser,
	removeChildData,
	type ChildData,
	type ChildrenList,
	type ObservationData
};
