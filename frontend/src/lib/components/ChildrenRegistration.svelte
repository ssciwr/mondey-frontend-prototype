<script lang="ts">
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import AlertMessage from '$lib/components/AlertMessage.svelte';
	import DataInput from '$lib/components/DataInput/DataInput.svelte';

	import {
		children,
		createDummyCurrent,
		createDummySummary,
		generateChildID,
		type ChildData
	} from '$lib/stores/childrenStore';

	import { hash, users } from '$lib/stores/userStore';

	import {
		Button,
		Card,
		Fileupload,
		Heading,
		Input,
		MultiSelect,
		Select,
		Textarea
	} from 'flowbite-svelte';

	import { onDestroy, onMount } from 'svelte';

	// this can be supplied from the database
	export let data = [
		{
			component: Input,
			value: null,
			props: {
				type: 'text',

				label: 'Name',
				placeholder: 'Bitte eintragen',
				key: 'name',
				required: true
			}
		},
		{
			component: Input,
			value: null,
			props: {
				type: 'date',

				label: 'Geburtsdatum',
				placeholder: 'Bitte eintragen',
				key: 'dateOfBirth',
				required: true
			}
		},
		{
			component: Select,
			value: null,
			props: {
				label: 'Frühgeburt',
				items: ['nein', '0-2 Monate', '2-4 Monate', '4-6 Monate'].map((v) => {
					return { name: String(v), value: v };
				}),
				placeholder: 'Bitte auswählen',
				key: 'bornEarly',
				required: true
			}
		},
		{
			component: Select,
			value: null,
			props: {
				label: 'Geschlecht',
				items: ['männlich', 'weiblich'].map((v) => {
					return { name: String(v), value: v };
				}),
				placeholder: 'Bitte auswählen',
				key: 'gender',
				required: true
			}
		},
		{
			component: MultiSelect,
			value: [],
			props: {
				label: 'Nationalität',
				items: ['Andere', 'Deutschland', 'Grossbritannien', 'USA', 'China'].map((v) => {
					return { name: String(v), value: v };
				}),
				placeholder: 'Bitte auswählen',
				key: 'nationality',
				required: true,
				textTrigger: 'Andere'
			}
		},
		{
			component: MultiSelect,
			value: [],
			props: {
				label: 'Sprache',
				items: ['Andere', 'Deutsch', 'Englisch (UK)', 'Englisch (Us)', 'Mandarin', 'Arabisch'].map(
					(v) => {
						return { name: String(v), value: v };
					}
				),
				placeholder: 'Bitte auswählen',
				key: 'language',
				required: true,
				textTrigger: 'Andere'
			}
		},
		{
			component: Select,
			value: null,
			props: {
				label: 'Verhältnis zum Kind',
				key: 'relationship',
				items: [
					'Andere',
					'Kind',
					'Enkelkind',
					'Neffe/Nichte',
					'Pflegekind',
					'Adoptivkind',
					'Betreuung extern',
					'Betreuung zu Hause'
				].map((v) => {
					return { name: String(v), value: v };
				}),
				placeholder: 'Bitte auswählen',
				required: true,
				textTrigger: 'Andere'
			}
		},
		{
			component: MultiSelect,
			value: [],
			props: {
				label: 'Entwicklungsauffälligkeiten',
				items: ['keine', 'Hörprobleme', 'Fehlsichtigkeit', 'Sprachfehler', 'Andere'].map((v) => {
					return { name: String(v), value: v };
				}),
				placeholder: 'Bitte auswählen',
				key: 'developmentalIssues',
				required: true,
				textTrigger: 'Andere'
			}
		},
		{
			component: Textarea,
			value: null,
			props: {
				label: 'Anmerkungen',
				placeholder: 'Weitere Bemerkungen',
				key: 'remarks',
				required: false
			}
		},
		{
			component: Fileupload,
			value: null,
			props: {
				label: 'Foto',
				placeholder: 'Bitte wählen sie ein Bild aus falls gewünscht',
				key: 'image',
				required: false,
				accept: ['png', 'jpg', 'svg', 'webp']
			}
		}
	];

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

			console.log(childData);
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
			{#if element.props.key === 'image'}
				<DataInput
					component={element.component}
					bind:this={refs[i]}
					properties={element.props}
					label={element.props.label}
					on:change={(event) => {
						if (!(event.target === null)) {
							const image = event.target.files[0];
							// use https://svelte.dev/repl/b17c13d4f1bb40799ccf09e0841ddd90?version=4.2.19
							let reader = new FileReader();
							reader.readAsDataURL(image);
							reader.onload = (e) => {
								element.value = e.target.result;
							};
						}
					}}
				/>
			{:else}
				<DataInput
					component={element.component}
					properties={element.props}
					label={element.props.label}
					on:change={(event) => {
						if (missingValues[i]) {
							if (element.value !== undefined && element.value !== null && element.value !== '') {
								missingValues[i] = false;
							}
						}
					}}
					textTrigger={element.props.textTrigger}
					bind:value={element.value}
				/>
			{/if}
		{/each}

		<Button
			class="bg-primary-700 hover:bg-primary-800 w-full rounded-lg px-4 py-2 font-semibold text-white"
			on:click={submitData}
			>{'Kind hinzufügen'}
		</Button>
	</form>
</Card>
