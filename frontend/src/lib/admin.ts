import { milestoneGroups } from '$lib/stores/adminStore';

export async function refreshMilestoneGroups() {
	console.log('refreshMilestoneGroups...');
	try {
		const res = await fetch(`${import.meta.env.VITE_MONDEY_API_URL}/admin/milestone-groups/`, {
			method: 'GET',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json'
			}
		});
		const json = await res.json();
		console.log(json);
		if (res.status === 200) {
			milestoneGroups.set(json);
		} else {
			console.log('Failed to get MilestoneGroups');
			milestoneGroups.set([]);
		}
	} catch (e) {
		console.error(e);
		milestoneGroups.set([]);
	}
}

export async function newMilestoneGroup() {
	console.log('newMilestoneGroup...');
	try {
		const res = await fetch(`${import.meta.env.VITE_MONDEY_API_URL}/admin/milestone-groups/`, {
			method: 'POST',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json'
			}
		});
		if (res.status === 200) {
			const newGroup = await res.json();
			console.log(newGroup);
			await refreshMilestoneGroups();
			return newGroup;
		} else {
			console.log('Failed to create new MilestoneGroup');
		}
	} catch (e) {
		console.error(e);
	}
	return null;
}

export async function updateMilestoneGroup(milestoneGroup) {
	console.log('updateMilestoneGroup...');
	console.log(milestoneGroup);
	try {
		const res = await fetch(`${import.meta.env.VITE_MONDEY_API_URL}/admin/milestone-groups`, {
			method: 'PUT',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json'
			},
			body: JSON.stringify(milestoneGroup)
		});
		if (res.status === 200) {
			const updatedGroup = await res.json();
			console.log(updatedGroup);
			await refreshMilestoneGroups();
			return updatedGroup;
		} else {
			console.log('Failed to create new MilestoneGroup');
		}
	} catch (e) {
		console.error(e);
	}
	return null;
}

export async function uploadMilestoneGroupImage(milestoneGroupId: number, file) {
	console.log('uploadMilestoneGroupImage...');
	try {
		const formData = new FormData();
		formData.append('file', file);
		const res = await fetch(
			`${import.meta.env.VITE_MONDEY_API_URL}/admin/milestone-group-images/${milestoneGroupId}`,
			{
				method: 'PUT',
				credentials: 'include',
				body: formData
			}
		);
		console.log(await res.json());
	} catch (e) {
		console.error(e);
	}
}

export async function deleteMilestoneGroup(milestoneGroupId: number | null) {
	try {
		const res = await fetch(
			`${import.meta.env.VITE_MONDEY_API_URL}/admin/milestone-groups/${milestoneGroupId}`,
			{
				method: 'DELETE',
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json'
				}
			}
		);
		const json = await res.json();
		console.log(json);
		if (res.status === 200) {
			console.log(`Deleted MilestoneGroup with id ${milestoneGroupId}.`);
			await refreshMilestoneGroups();
		} else {
			console.log(`Error deleting MilestoneGroup with id ${milestoneGroupId}.`);
		}
	} catch (e) {
		console.error(e);
	}
}

export function milestoneGroupImageUrl(id: number) {
	return `${import.meta.env.VITE_MONDEY_API_URL}/static/mg${id}.jpg`;
}
