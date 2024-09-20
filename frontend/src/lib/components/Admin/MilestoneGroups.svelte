<script lang="ts">
	import { AccordionItem, Accordion, Card } from 'flowbite-svelte';

	let milestoneGroups: Array<object> = [];

	async function getMilestoneGroups() {
		try {
			const res = await fetch('http://localhost:8000/admin/milestone-groups/', {
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
				milestoneGroups = json;
			} else {
				milestoneGroups = [];
			}
		} catch (e) {
			console.error(e);
			milestoneGroups = [];
		}
	}

	getMilestoneGroups();
</script>

<Card size="xl" class="m-5">
	<Accordion>
		{#each milestoneGroups as milestoneGroup}
			<AccordionItem>
				<span slot="header">
					<div class="flex flex-row flex-wrap items-center">
						<img
							src={`http://localhost:8000/static/milestone_group_${milestoneGroup.id}.jpg`}
							width="100"
							height="100"
							alt={milestoneGroup.text.de.title}
							class="p-2"
						/>
						<h5 class="mb-5 text-center text-2xl font-bold text-gray-900 dark:text-white">
							{milestoneGroup.text.de.title}
						</h5>
					</div>
				</span>
				{milestoneGroup.text.de.desc}
			</AccordionItem>
		{/each}
	</Accordion>
</Card>
