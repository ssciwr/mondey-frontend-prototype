<script>
	import { Button, Card, Gallery } from 'flowbite-svelte';
	import { ArrowRightOutline } from 'flowbite-svelte-icons';

	// Define the styles for the header, paragraph, arrow, and button
	const headerStyle = 'mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white';
	const paragraphStyle = 'mb-3 font-normal text-gray-700 dark:text-gray-400 leading-tight';
	const arrowStyle = 'ms-2 h-6 w-6 text-white';
	const buttonStyle = 'w-fit';
	const galleryStyle = 'grid-cols-2 gap-y-12';
	const cardStyle = 'p-6 m-4 w-full';
</script>

<!-- This is a dummy landing page that is only there to check that the AbstractComponent works as it should-->
<Gallery class={galleryStyle}>
	<Card class={cardStyle}>
		<h5 class={headerStyle}>Was ist Mondey?</h5>
		<p class={paragraphStyle}>
			<i>Mondey</i> ist ein wissentschaftlich geprüftes Programm zure Dokumentation der Entwicklung von
			Kindern bis 6 Jahren.
		</p>
		<Button class={buttonStyle}>Mehr Info <ArrowRightOutline class={arrowStyle} /></Button>
	</Card>

	<Card class={cardStyle}>
		<h5 class={headerStyle}>Wozu ist Mondey gut?</h5>
		<p class={paragraphStyle}>
			Anhand ihrer Bewertungen der Fähigkeiten des Kindes erhalten sie Feedback zum
			Entwicklungsstand des Kindes und können so frühzeitig Fördermaßnahmen einleiten. Dies folgt
			einem übersichtlichen Ampelsystem.
		</p>
		<Button class={buttonStyle}>Mehr Info <ArrowRightOutline class={arrowStyle} /></Button>
	</Card>

	<Card class={cardStyle}>
		<h5 class={headerStyle}>Was umfasst Mondey?</h5>
		<p class={paragraphStyle}>
			<i>Mondey</i> umfasst unterschiedliche Entwicklungsbereiche wie von Kindern im Alter von 0 bis
			6 Jahren. Dazu gehören unter anderem Grob-und feinmotorik, Wahrnehmung, Denkne, Sprache und Soziale
			Beziehungen.
		</p>
		<Button class={buttonStyle}>Mehr Info <ArrowRightOutline class={arrowStyle} /></Button>
	</Card>

	<Card class={cardStyle}>
		<h5 class={headerStyle}>Wie funktioniert Mondey?</h5>
		<p class={paragraphStyle}>
			Sie bewerten wie gut das Kind bestimmte Alltagshandlungen durchführen kann mit Hilfe einer
			Liste von Fragen.
		</p>
		<Button class={buttonStyle}>Mehr Info <ArrowRightOutline class={arrowStyle} /></Button>
	</Card>

	<Card class={cardStyle}>
		<h5 class={headerStyle}>Wo fange ich an?</h5>
		<p class={paragraphStyle}>
			Um zu beginnen, müssen sie sich registrieren und ein Profil für ihr Kind anlegen.
		</p>
		<Button class={buttonStyle}>Los geht's <ArrowRightOutline class={arrowStyle} /></Button>
	</Card>
</Gallery>
