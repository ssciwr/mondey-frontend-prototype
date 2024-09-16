import { children } from '$lib/stores/childrenStore';
import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad}     */
export async function load({ params }) {
	await children.load();
	const observationData = await children.fetchObservationData(params.userID, params.childID);
	const childData = await children.fetchChildData(params.userID, params.childID);

	if (observationData && childData) {
		return {
			observationData: observationData,
			childData: childData
		};
	} else {
		error(404, 'Not Found');
	}
}
export const prerender = false;
