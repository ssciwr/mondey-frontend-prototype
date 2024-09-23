<script lang="ts">
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import AlertMessage from '$lib/components/AlertMessage.svelte';
	import DataInput from '$lib/components/DataInput/DataInput.svelte';
	import NavigationButtons from '$lib/components/Navigation/NavigationButtons.svelte';

	import {
		children,
		createDummyCurrent,
		createDummySummary,
		generateChildID,
		type ChildData
	} from '$lib/stores/childrenStore';

	import { hash, users } from '$lib/stores/userStore';

	import { Card, Heading } from 'flowbite-svelte';

	import { onDestroy, onMount } from 'svelte';

	// event handlers and verification function
	export async function submitData() {
		const verified = await verifyInput();
		if (verified) {
			const childID = generateChildID(childData.name);
			await children.addChildData(userID, childID, childData);
			await children.addChildObservation(userID, childID, {
				user: userID,
				id: childID,
				summary: await createDummySummary(),
				current: await createDummyCurrent()
			});

			await goto(nextpage as string);
		} else {
			showAlert = true;
		}
	}

	async function verifyInput(): Promise<Boolean> {
		let required: { [key: string]: Boolean } = {};

		childData = data.reduce((dict: any, curr) => {
			dict[curr.props.key] = curr.value;
			required[curr.props.key] = curr.props.required;
			return dict;
		}, {});

		const test = Object.entries(childData).every((kv) =>
			required[kv[0]] ? kv[1] !== undefined && kv[1] !== null && kv[1] !== '' : true
		);

		if (test) {
			missingValues = [];
			const childID = generateChildID(childData.name);
			// add additional data to the child
			childData['user'] = userID;
			childData['id'] = childID;
			childData['info'] = childData.remarks;
			showCheckMessage = false;
			return true;
		} else {
			(missingValues as Boolean[]) = Object.keys(childData).map((key) => {
				return childData[key] && required[key] ? false : true;
			});
			return false;
		}
	}

	// data to display -> will later be fetched from the server
	const heading = 'Neues Kind registrieren';
	const userID = users.get()['loggedIn'];

	// data
	let refs: unknown[] = [];
	// let data = rawData.map(processData);
	let childData: ChildData;
	let nextpage: string = `${base}/childrengallery`;
	let unsubscribe: unknown = children.subscribe((childrenlist) => {
		children.save();
	});
	// this can be supplied from the database
	export let data: any[];

	// rerender page if missing values or showAlert changes
	$: missingValues = [];
	$: showAlert = false;
	$: showCheckMessage = true;

	// use component lifecycle to make sure data is written and read persistently

	onMount(async () => {
		await children.load();
		await users.load();

		// README: temporary fix because the linking is broken atm
		const h = await hash('123');

		if (!children.get()['dummyUser' + h]) {
			await children.addUser('dummyUser' + h);
		}
	});

	onDestroy(async () => {
		await children.save();
		await (unsubscribe as Function)();
	});

	const buttons = [
		{
			label: 'Abschließen',
			onclick: submitData
		}
	];
</script>

<!-- Show big alert message when something is missing -->
{#if showAlert}
	<AlertMessage
		title="Fehler"
		message="Bitte füllen Sie mindestens die benötigten Felder (hervorgehoben) aus."
		lastpage="{base}/childLand/childDataInput/"
		infopage="{base}/info"
		infotitle="Was passiert mit den Daten"
		onclick={() => {
			showAlert = false;
			missingValues = [];
		}}
	/>
{/if}

{#if showCheckMessage}
	<AlertMessage
		title="Bevor es weitergeht"
		message="Bitte überprüfen sie ihre eingaben nochmals genau bevor sie weiter gehen"
		lastpage="{base}/childLand/childDataInput"
		infopage={base}
		infotitle="Was passiert mit den Daten?"
		onclick={() => {
			showCheckMessage = false;
		}}
	/>
{/if}

<!-- The actual content -->
<div class="container m-1 mx-auto w-full max-w-xl">
	<Card class="container m-1 mx-auto w-full max-w-xl">
		{#if heading}
			<Heading
				tag="h3"
				class="m-1 mb-3 p-1 text-center font-bold tracking-tight text-gray-700 dark:text-gray-400"
				>{heading}</Heading
			>
		{/if}

		<form class="m-1 mx-auto w-full flex-col space-y-6">
			{#each data as element, i}
				<DataInput
					component={element.component}
					bind:value={element.value}
					bind:additionalInput={element.additionalValue}
					label={element.props.label}
					properties={element.props}
					textTrigger={element.props.textTrigger}
				/>
			{/each}
		</form>
		<NavigationButtons {buttons} />
	</Card>
</div>
