<script>
	import { BottomNav } from 'flowbite-svelte';

	import { CaretLeftSolid, CaretRightSolid, LightbulbSolid } from 'flowbite-svelte-icons';
	// logo
	import BottomNavElement from './Navigation/BottomNavElement.svelte';

	// variables for showing or hiding elements
	export let showBottomNavbar = true;

	// variables for communication upon hitting the page
	// FIXME: these are placeholders and must later be changed using contexts or other better mechanisms for inter component comunication
	export let lastpage = '/';
	export let nextpage = '/';
	export let infopage = '/';
</script>

<!-- Top element: basic navigation-->

<!--Page content goes here-->
<div class="mx-auto max-w-6xl flex-1 overflow-y-auto p-4 pb-20">
	<slot></slot>
</div>

{#if showBottomNavbar}
	<BottomNav
		class="fixed bottom-0 left-0 right-0 border-t border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800"
		classInner="grid-cols-3"
	>
		<BottomNavElement
			href={lastpage}
			description={'Zurück'}
			Icon={CaretLeftSolid}
			tooltip={'Zur letzten Seite'}
		/>

		<BottomNavElement
			href={infopage}
			description={'Hilfe'}
			Icon={LightbulbSolid}
			tooltip={'Zusätzliche Informationen'}
		/>

		<BottomNavElement
			href={nextpage}
			description={'Weiter'}
			Icon={CaretRightSolid}
			tooltip={'Zur nächsten Seite'}
		/>
	</BottomNav>
{/if}
