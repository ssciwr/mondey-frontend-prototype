<script>
	import {
		Avatar,
		BottomNav,
		BottomNavItem,
		DarkMode,
		Navbar,
		NavBrand,
		NavHamburger,
		NavLi,
		NavUl,
		Tooltip
	} from 'flowbite-svelte';

	import {
		CaretLeftSolid,
		CaretRightSolid,
		LightbulbSolid,
		MoonSolid,
		SunSolid
	} from 'flowbite-svelte-icons';

	import logo_dark from '../assets/mondey_dark.svg';
	import logo_light from '../assets/mondey_light.svg';

	// variables for showing or hiding elements
	export let showBottomNavbar = true;

	// variables for communication upon hitting the page
	// FIXME: these are placeholders and must later be changed using contexts or other better mechanisms for inter component comunication
	export let lastpage = '/';
	export let nextpage = '/';
	export let infopage = '/';

	export let name = 'Registrieren';
</script>

<!-- Top element: basic navigation-->
<Navbar>
	<NavBrand href="/">
		<img src={logo_light} class="block h-16 dark:hidden" alt="MONDEY Logo" />
		<img src={logo_dark} class="hidden h-16 dark:block" alt="MONDEY Logo" />
	</NavBrand>
	<NavHamburger />
	<NavUl
		ulClass="flex flex-col p-4 mt-4 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:text-lg md:font-medium"
	>
		<NavLi href="/" active={true}>Home</NavLi>
		<NavLi href="/">Aktuelles</NavLi>
		<NavLi href="/">Downloads</NavLi>
		<NavLi href="/">Kontakt</NavLi>
		<DarkMode
			class="rounded-lg p-2 text-xl text-gray-500 hover:text-primary-800 group-hover:text-primary-800 dark:text-gray-400 dark:hover:text-primary-500 dark:group-hover:text-primary-500"
			,
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
		<div class="flex items-center space-x-4 rtl:space-x-reverse">{name}</div>
		<Tooltip>Registrieren oder einloggen</Tooltip>
	</div>
</Navbar>

<!--Page content goes here-->
<div class="mx-auto max-w-6xl p-4">
	<slot></slot>
</div>

{#if showBottomNavbar}
	<!-- bottom element: back, info and next buttons-->
	<BottomNav position="absolute" classInner="grid-cols-3">
		<BottomNavItem
			href={lastpage}
			btnName="Zurück"
			btnClass="text-gray-500 dark:text-gray-400 hover:text-primary-800 dark:hover:text-primary-500 group-hover:text-primary-800 dark:group-hover:text-primary-500"
		>
			<CaretLeftSolid
				class="mb-1 h-8 w-8 text-gray-500 hover:text-primary-800 group-hover:text-primary-800 dark:text-gray-400 dark:hover:text-primary-500 dark:group-hover:text-primary-500"
			/>
			<Tooltip arrow={false}>Zur letzten Seite</Tooltip>
		</BottomNavItem>
		<BottomNavItem
			href={infopage}
			btnName="Hilfe"
			btnClass="text-gray-500 dark:text-gray-400 hover:text-primary-800 dark:hover:text-primary-500 group-hover:text-primary-800 dark:group-hover:text-primary-500"
		>
			<LightbulbSolid
				class="mb-1 h-8 w-8 text-gray-500 hover:text-primary-800 group-hover:text-primary-800 dark:text-gray-400 dark:hover:text-primary-500 dark:group-hover:text-primary-500"
			/>
			<Tooltip arrow={false}>Hilfe</Tooltip>
		</BottomNavItem>
		<BottomNavItem
			href={nextpage}
			btnName="Weiter"
			btnClass="text-gray-500 dark:text-gray-400 hover:text-primary-800 dark:hover:text-primary-500 group-hover:text-primary-800 dark:group-hover:text-primary-500"
		>
			<CaretRightSolid
				class="mb-1 h-8 w-8 text-gray-500 hover:text-primary-800 group-hover:text-primary-800 dark:text-gray-400 dark:hover:text-primary-500 dark:group-hover:text-primary-500"
			/>
			<Tooltip arrow={false}>Zur nächsten Seite</Tooltip>
		</BottomNavItem>
	</BottomNav>
{/if}
