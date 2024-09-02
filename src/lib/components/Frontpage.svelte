<script>
	// @ts-nocheck

	import CardDisplay from '$lib/components//DataDisplay/CardDisplay.svelte';
	import GalleryDisplay from '$lib/components/DataDisplay/GalleryDisplay.svelte';
	import { children } from '$lib/stores/childrenStore';
	import { createDummyUser, users } from '$lib/stores/userStore';

	import { onMount } from 'svelte';

	export let getStarted = '';

	export let items = [
		{
			header: 'Was ist Mondey?',
			summary:
				'Mondey ist ein wissentschaftlich geprüftes Programm zure Dokumentation der Entwicklung von Kindern bis 6 Jahren.',
			href: '/info',
			button: 'Mehr Info'
		},
		{
			header: 'Wozu ist Mondey gut?',
			summary:
				'Anhand ihrer Bewertungen der Fähigkeiten des Kindes erhalten sie Feedback zum Entwicklungsstand des Kindes und können so frühzeitig Fördermaßnahmen einleiten. Dies folgt einem übersichtlichen Ampelsystem.',
			href: '/info',
			button: 'Mehr Info'
		},
		{
			header: 'Was umfasst Mondey?',
			summary:
				'Mondey umfasst unterschiedliche Entwicklungsbereiche wie von Kindern im Alter von 0 bis 6 Jahren. Dazu gehören unter anderem Grob-und feinmotorik, Wahrnehmung, Denkne, Sprache und Soziale Beziehungen.',
			href: '/info',
			button: 'Mehr Info'
		},
		{
			header: 'Wie funktioniert Mondey?',
			summary:
				'Sie bewerten wie gut das Kind bestimmte Alltagshandlungen durchführen kann mit Hilfe einer Liste von Fragen.',
			href: '/info',
			button: 'Mehr Info'
		},
		{
			header: 'Wo fange ich an?',
			summary: 'Um zu beginnen, müssen sie sich registrieren und ein Profil für ihr Kind anlegen.',
			href: getStarted,
			button: 'Los geht´s'
		},
		{
			header: 'dummy?',
			summary:
				'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Impedit repellendus distinctio facilis! Voluptas corrupti recusandae sapiente doloribus voluptatem fugiat ducimus.',
			href: '/info',
			button: 'Mehr Info'
		},
		{
			header: 'dummy?',
			summary:
				'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Impedit repellendus distinctio facilis! Voluptas corrupti recusandae sapiente doloribus voluptatem fugiat ducimus.',
			href: '/info',
			button: 'Mehr Info'
		},
		{
			header: 'dummy?',
			summary:
				'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Impedit repellendus distinctio facilis! Voluptas corrupti recusandae sapiente doloribus voluptatem fugiat ducimus.',
			href: '/info',
			button: 'Mehr Info'
		}
	];

	const props = {};

	onMount(async () => {
		// delete old data first, then add new user and save it to disk
		try {
			localStorage.clear();
		} catch (error) {
			console.log('error in frontpage: ', error);
		}

		try {
			await createDummyUser();
			await users.setLoggedIn(null);
		} catch (error) {
			console.log('error in frontpage: ', error);
		}

		try {
			if (!children.get()['dummyUser123']) {
				await children.addUser('dummyUser123');
			}
		} catch (error) {
			console.log('error in frontpage: ', error);
		}

		try {
			await children.save();
			await users.save();
		} catch (error) {
			console.log('error in frontpage: ', error);
		}
	});
</script>

<GalleryDisplay
	withSearch={false}
	itemComponent={CardDisplay}
	data={items}
	componentProps={props}
/>
