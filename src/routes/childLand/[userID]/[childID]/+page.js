import { fetchChildData, fetchObservationData } from '$lib/stores/childrenStore';
import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad}     */
export async function load({ params }) {
	const observationData = await fetchObservationData(params.userID, params.childID);
	const childData = await fetchChildData(params.userID, params.childID);

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
