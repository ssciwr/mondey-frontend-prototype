import { get, writable } from 'svelte/store';

interface ObservationData {
	summary: object;
	current: object;
}

interface ChildData {
	observationData: ObservationData;
	[key: string]: unknown;
}

interface ChildrenList {
	[usertoken: string]: {
		[childtoken: string]: ChildData;
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
	children.update((childrenlist) => {
		if (!(usertoken in childrenlist)) {
			throw new Error(`User token ${usertoken} not found`);
		}

		if (childtoken in childrenlist[usertoken]) {
			throw new Error(`Child token ${childtoken} already exists for user token ${usertoken}`);
		}
		childrenlist[usertoken][childtoken] = data;

		return childrenlist;
	});
}

async function removeChildData(usertoken: string, childtoken: string) {
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
	const contentData = get(children);

	if (!(usertoken in contentData)) {
		throw new Error('No such user in the childrenstore');
	}

	if (!(childtoken in contentData[usertoken as keyof ChildrenList])) {
		throw new Error('No such child in the childrenstore for user' + usertoken);
	}

	return contentData[usertoken as keyof ChildrenList][childtoken];
}

// hardcode dummy child-data which later will live in the database on the server and be fetched from there.

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
	info: 'A child that is making a mess and is doing good. Click to view more.',
	observationData: dummyObservationData
});
await addChildData('dummyUser', 'childBen', {
	name: 'Ben',
	image: 'child_avatar.png',
	info: 'A child that is making a mess and is doing good. Click to view more.',
	observationData: dummyObservationData
});
await addChildData('dummyUser', 'childC', {
	name: 'C',
	image: 'children.png',
	info: 'A child that is making a mess and is doing good. Click to view more.',
	observationData: dummyObservationData
});
await addChildData('dummyUser', 'childDora', {
	name: 'Dora',
	image: 'children.png',
	info: 'A child that is making a mess and is doing good. Click to view more.',
	observationData: dummyObservationData
});
await addChildData('dummyUser', 'childE', {
	name: 'E',
	image: 'children.png',
	info: 'A child that is making a mess and is doing good. Click to view more.',
	observationData: dummyObservationData
});
await addChildData('dummyUser', 'childF', {
	name: 'F',
	image: 'children.png',
	info: 'A child that is making a mess and is doing good. Click to view more.',
	observationData: dummyObservationData
});

export {
	addChildData,
	addUser,
	children,
	fetchChildData,
	removeChildData,
	type ChildData,
	type ChildrenList,
	type ObservationData
};
