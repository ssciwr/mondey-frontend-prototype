import ChildrenGallery from '$lib/components/ChildrenGallery.svelte';
import MilestoneGroup from '$lib/components/MilestoneGroup.svelte';
import MilestoneOverview from '$lib/components/MilestoneOverview.svelte';
import UserDataInput from '$lib/components/UserDataInput.svelte';
import { writable } from 'svelte/store';

// put all the components here. can be an expanding list
export const componentTable = {
	userDataInput: UserDataInput,
	childrenGallery: ChildrenGallery,
	milestoneGroup: MilestoneGroup,
	milestoneOverview: MilestoneOverview
};
export const activeTabPersonal = writable('userDataInput');
export const activeTabChildren = writable('childrenGallery');
