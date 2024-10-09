import { milestoneGroups, userQuestions } from '$lib/stores/adminStore';
import { getMilestoneGroupsAdmin, getUserQuestionsAdmin } from '$lib/client/services.gen';

export async function refreshMilestoneGroups() {
	console.log('refreshMilestoneGroups...');
	const { data, error } = await getMilestoneGroupsAdmin();
	if (error || data == undefined) {
		console.log('Failed to get MilestoneGroups');
		milestoneGroups.set([]);
	} else {
		milestoneGroups.set(data);
	}
}

export function milestoneGroupImageUrl(id: number) {
	return `${import.meta.env.VITE_MONDEY_API_URL}/static/mg${id}.jpg`;
}

export async function refreshUserQuestions() {
	console.log('refreshQuestions...');
	const { data, error } = await getUserQuestionsAdmin();
	if (error || data === undefined) {
		console.log('Failed to get UserQuestions');
		userQuestions.set([]);
	} else {
		userQuestions.set(data);
	}
}
