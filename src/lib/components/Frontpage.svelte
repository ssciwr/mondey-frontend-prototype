<script>
	import CardDisplay from '$lib/components/DataDisplay/CardDisplay.svelte';
	import { Gallery } from 'flowbite-svelte';
	export let getStarted = '/';
	console.log('get started: ', getStarted);

	export let items = [
		{
			header: 'Was ist Mondey?',
			summary:
				'Mondey ist ein wissentschaftlich geprüftes Programm zure Dokumentation der Entwicklung von Kindern bis 6 Jahren.',
			link: '/info',
			buttonName: 'Mehr Info'
		},
		{
			header: 'Wozu ist Mondey gut?',
			summary:
				'Anhand ihrer Bewertungen der Fähigkeiten des Kindes erhalten sie Feedback zum Entwicklungsstand des Kindes und können so frühzeitig Fördermaßnahmen einleiten. Dies folgt einem übersichtlichen Ampelsystem.',
			link: '/info',
			buttonName: 'Mehr Info'
		},
		{
			header: 'Was umfasst Mondey?',
			summary:
				'Mondey umfasst unterschiedliche Entwicklungsbereiche wie von Kindern im Alter von 0 bis 6 Jahren. Dazu gehören unter anderem Grob-und feinmotorik, Wahrnehmung, Denkne, Sprache und Soziale Beziehungen.',
			link: '/info',
			buttonName: 'Mehr Info'
		},
		{
			header: 'Wie funktioniert Mondey?',
			summary:
				'Sie bewerten wie gut das Kind bestimmte Alltagshandlungen durchführen kann mit Hilfe einer Liste von Fragen.',
			link: '/info',
			buttonName: 'Mehr Info'
		},
		{
			header: 'Wo fange ich an?',
			summary: 'Um zu beginnen, müssen sie sich registrieren und ein Profil für ihr Kind anlegen.',
			link: '/firstdropdown',
			buttonName: 'Los geht´s'
		},
		{
			header: 'dummy?',
			summary:
				'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Impedit repellendus distinctio facilis! Voluptas corrupti recusandae sapiente doloribus voluptatem fugiat ducimus.',
			link: '/info',
			buttonName: 'Mehr Info'
		},
		{
			header: 'dummy?',
			summary:
				'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Impedit repellendus distinctio facilis! Voluptas corrupti recusandae sapiente doloribus voluptatem fugiat ducimus.',
			link: '/info',
			buttonName: 'Mehr Info'
		},
		{
			header: 'dummy?',
			summary:
				'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Impedit repellendus distinctio facilis! Voluptas corrupti recusandae sapiente doloribus voluptatem fugiat ducimus.',
			link: '/info',
			buttonName: 'Mehr Info'
		}
	];
</script>

<!-- This is a dummy landing page that is only there to check that the AbstractComponent works as it should-->
<Gallery class="grid-cols-1 gap-y-12 md:grid-cols-2">
	{#each items as item}
		<CardDisplay
			header={item.header}
			summary={item.summary}
			link={item.link}
			button={item.buttonName}
		/>
	{/each}
</Gallery>
