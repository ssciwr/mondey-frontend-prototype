<script>
	import {
		Avatar,
		BottomNav,
		DarkMode,
		Navbar,
		NavBrand,
		NavHamburger,
		NavLi,
		NavUl,
		Tooltip
	} from 'flowbite-svelte';
	import { CaretLeftSolid, MoonSolid, SunSolid } from 'flowbite-svelte-icons';
	// logo
	import logo_dark from '../assets/mondey_dark.svg';
	import logo_light from '../assets/mondey_light.svg';
	import BottomNavElement from './Navigation/BottomNavElement.svelte';

	// variables for showing or hiding elements
	export let showBottomNavbar = true;

	// variables for communication upon hitting the page
	// FIXME: these are placeholders and must later be changed using contexts or other better mechanisms for inter component comunication
	export let lastpage = '/';
	export let nextpage = '/';
	export let infopage = '/';

	export let userName = 'Registrieren';
</script>

<!-- Top element: basic navigation-->
<Navbar class="overflow-x-auto whitespace-nowrap">
	<div class="flex flex-nowrap items-center space-x-4 rtl:space-x-reverse">
		<NavBrand href="/">
			<img src={logo_light} class="block h-16 dark:hidden" alt="MONDEY Logo" />
			<img src={logo_dark} class="hidden h-16 dark:block" alt="MONDEY Logo" />
		</NavBrand>
		<NavHamburger />
		<NavUl ulClass="flex flex-row space-x-4 rtl:space-x-reverse md:text-lg md:font-medium">
			<NavLi href="/" active={true}>Home</NavLi>
			<NavLi href="/">Aktuelles</NavLi>
			<NavLi href="/">Downloads</NavLi>
			<NavLi href="/">Kontakt</NavLi>
			<DarkMode
				class="rounded-lg p-2 text-xl text-gray-500 hover:text-primary-800 group-hover:text-primary-800 dark:text-gray-400 dark:hover:text-primary-500 dark:group-hover:text-primary-500"
			>
				<MoonSolid slot="darkIcon" />
				<SunSolid slot="lightIcon" />
			</DarkMode>
			<Tooltip arrow={false}>Darkmode ein- oder ausschalten</Tooltip>
		</NavUl>
		<div class="flex items-center space-x-4 rtl:space-x-reverse">
			<Avatar
				class="space-y-1 text-gray-500 hover:text-primary-800 group-hover:text-primary-800 dark:text-gray-400 dark:hover:text-primary-500 dark:group-hover:text-primary-500"
				rounded
				border
			/>
			<div class="flex items-center space-x-4 rtl:space-x-reverse">{userName}</div>
			<Tooltip>Registrieren oder einloggen</Tooltip>
		</div>
	</div>
</Navbar>

<!--Page content goes here-->
<div class="mx-auto max-w-6xl flex-1 overflow-y-auto p-4 pb-20">
	<slot></slot>
</div>

{#if showBottomNavbar}
	<!-- bottom element: back, info and next buttons-->
	<BottomNav
		class="fixed bottom-0 left-0 right-0 border-t border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800"
		classInner="grid-cols-3"
	>
		<BottomNavElement
			href="{lastpage},"
			description="{'Zurück'},"
			Icon="{CaretLeftSolid},"
			tooltip={'Zur letzten Seite'}
		></BottomNavElement>

		<!-- <BottomNavElement
			href="{infopage},"
			description="{'Hilfe'},"
			Icon="{LightbulbSolid},"
			tooltip={'Zusätzliche Informationen'}
		></BottomNavElement>

		<BottomNavElement
			href="{nextpage},"
			description="{'Weiter'},"
			Icon="{CaretLeftSolid},"
			tooltip={'Zur nächsten Seite'}
		></BottomNavElement> -->
	</BottomNav>
{/if}
