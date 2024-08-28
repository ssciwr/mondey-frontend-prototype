<script lang="ts">
	import AbstractContent from '$lib/components/AbstractContent.svelte';
	import AbstractDataInput from '$lib/components/DataInput/AbstractDataInput.svelte';
	import AbstractDropdownItem from '$lib/components/DataInput/AbstractDropdownItem.svelte';
	import { type MilestoneDef } from '$lib/stores/contentStore';

	/**
	 * Converts the milestone data and adds components to display each element.
	 * @param milestoneData list of milestone data recovered from the backend
	 */
	function convertData(milestoneData: MilestoneDef[]) {
		return milestoneData.map((milestone) => {
			return {
				itemComponent: AbstractDropdownItem,
				componentProps: milestone
			};
		});
	}

	// use reactive statements to rerender the page each time the data changes.
	// this should make sure that each time the page is rerouted to another instance of itself,
	// the data is updated correctly and the new content is shown.
	let x = null;
	$: console.log($$props.data.data.next, $$props.data.data.last);
	$: heading = $$props.data.surveyName;
	$: description = $$props.data.data.description;
	$: data_to_display = convertData($$props.data.data.milestones);
	$: next =
		$$props.data.data.next !== null
			? `/dataAcquisition/${$$props.data.data.next}`
			: '/surveyfeedback';

	$: last =
		$$props.data.data.last !== null
			? `/dataAcquisition/${$$props.data.data.last}`
			: '/childrengallery';
</script>

<AbstractContent showBottomNavbar={true} lastpage={last} nextpage={next} infopage="/info">
	<AbstractDataInput {heading} {description} props={data_to_display} />
</AbstractContent>
