<script>
	import { Button, Card, Gallery } from 'flowbite-svelte';
	import { ArrowRightOutline } from 'flowbite-svelte-icons';
	export let getStarted = '/';
	console.log('get started: ', getStarted);
</script>

<!-- This is a dummy landing page that is only there to check that the AbstractComponent works as it should-->
<Gallery class="grid-cols-1 gap-y-12 md:grid-cols-2">
	<Card class="m-4 w-full p-6">
		<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
			Was ist Mondey?
		</h5>
		<p class="mb-3 font-normal leading-tight text-gray-700 dark:text-gray-400">
			<i>Mondey</i> ist ein wissentschaftlich geprüftes Programm zure Dokumentation der Entwicklung von
			Kindern bis 6 Jahren.
		</p>
		<Button href="/info" class="w-fit"
			>Mehr Info <ArrowRightOutline class="ms-2 h-6 w-6 text-white" /></Button
		>
	</Card>

	<Card class="m-4 w-full p-6">
		<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
			Wozu ist Mondey gut?
		</h5>
		<p class="mb-3 font-normal leading-tight text-gray-700 dark:text-gray-400">
			Anhand ihrer Bewertungen der Fähigkeiten des Kindes erhalten sie Feedback zum
			Entwicklungsstand des Kindes und können so frühzeitig Fördermaßnahmen einleiten. Dies folgt
			einem übersichtlichen Ampelsystem.
		</p>
		<Button href="/info" class="w-fit"
			>Mehr Info <ArrowRightOutline class="ms-2 h-6 w-6 text-white" /></Button
		>
	</Card>

	<Card class="m-4 w-full p-6">
		<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
			Was umfasst Mondey?
		</h5>
		<p class="mb-3 font-normal leading-tight text-gray-700 dark:text-gray-400">
			<i>Mondey</i> umfasst unterschiedliche Entwicklungsbereiche wie von Kindern im Alter von 0 bis
			6 Jahren. Dazu gehören unter anderem Grob-und feinmotorik, Wahrnehmung, Denkne, Sprache und Soziale
			Beziehungen.
		</p>
		<Button href="/info" class="w-fit"
			>Mehr Info <ArrowRightOutline class="ms-2 h-6 w-6 text-white" /></Button
		>
	</Card>
	<Card class="m-4 w-full p-6">
		<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
			Wie funktioniert Mondey?
		</h5>
		<p class="mb-3 font-normal leading-tight text-gray-700 dark:text-gray-400">
			Sie bewerten wie gut das Kind bestimmte Alltagshandlungen durchführen kann mit Hilfe einer
			Liste von Fragen.
		</p>
		<Button href="/info" class="w-fit"
			>Mehr Info <ArrowRightOutline class="ms-2 h-6 w-6 text-white" /></Button
		>
	</Card>

	<Card class="m-4 w-full p-6">
		<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
			Wo fange ich an?
		</h5>
		<p class="mb-3 font-normal leading-tight text-gray-700 dark:text-gray-400">
			Um zu beginnen, müssen sie sich registrieren und ein Profil für ihr Kind anlegen.
		</p>
		<Button class="w-fit" href={getStarted}
			>Los geht's <ArrowRightOutline class="ms-2 h-6 w-6 text-white" /></Button
		>
	</Card>

	<Card class="m-4 w-full p-6">
		<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">dummy?</h5>
		<p class="mb-3 font-normal leading-tight text-gray-700 dark:text-gray-400">
			<i
				>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Impedit repellendus distinctio
				facilis! Voluptas corrupti recusandae sapiente doloribus voluptatem fugiat ducimus.
			</i>
		</p>
		<Button href="/info" class="w-fit"
			>dummy <ArrowRightOutline class="ms-2 h-6 w-6 text-white" /></Button
		>
	</Card>

	<Card class="m-4 w-full p-6">
		<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">dummy?</h5>
		<p class="mb-3 font-normal leading-tight text-gray-700 dark:text-gray-400">
			<i
				>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Impedit repellendus distinctio
				facilis! Voluptas corrupti recusandae sapiente doloribus voluptatem fugiat ducimus.
			</i>
		</p>
		<Button href="/info" class="w-fit"
			>dummy <ArrowRightOutline class="ms-2 h-6 w-6 text-white" /></Button
		>
	</Card>

	<Card class="m-4 w-full p-6">
		<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">dummy?</h5>
		<p class="mb-3 font-normal leading-tight text-gray-700 dark:text-gray-400">
			<i
				>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Impedit repellendus distinctio
				facilis! Voluptas corrupti recusandae sapiente doloribus voluptatem fugiat ducimus.
			</i>
		</p>
		<Button href="/info" class="w-fit"
			>dummy <ArrowRightOutline class="ms-2 h-6 w-6 text-white" /></Button
		>
	</Card>

	<Card class="m-4 w-full p-6">
		<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">dummy?</h5>
		<p class="mb-3 font-normal leading-tight text-gray-700 dark:text-gray-400">
			<i
				>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Impedit repellendus distinctio
				facilis! Voluptas corrupti recusandae sapiente doloribus voluptatem fugiat ducimus.
			</i>
		</p>
		<Button href="/info" class="w-fit"
			>dummy <ArrowRightOutline class="ms-2 h-6 w-6 text-white" /></Button
		>
	</Card>
</Gallery>
