<script>
	import {
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

	// button stylings
	const basicBtnForm = 'rounded-lg text-xl p-2';

	const basicColorBehavior =
		'text-gray-500 dark:text-gray-400 hover:text-primary-800 dark:hover:text-primary-500 group-hover:text-primary-800 dark:group-hover:text-primary-500';

	const topBarBtnClass = basicColorBehavior + basicBtnForm;

	const bottomBarBtnClass = 'w-8 h-8 mb-1' + basicColorBehavior;

	// styling for the nav
	const navULclass =
		'flex flex-col p-4 mt-4 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:text-lg md:font-medium';

	const contentContainerClass = 'mx-auto max-w-6xl p-4';
</script>

<!-- Top element-->
<Navbar>
	<NavBrand href="/">
		<img src={logo_light} class="block h-16 dark:hidden" alt="MONDEY Logo" />
		<img src={logo_dark} class="hidden h-16 dark:block" alt="MONDEY Logo" />
	</NavBrand>
	<NavHamburger />
	<NavUl ulClass={navULclass}>
		<NavLi href="/" active={true}>Home</NavLi>
		<NavLi href="/">Aktuelles</NavLi>
		<NavLi href="/">Downloads</NavLi>
		<NavLi href="/">Kontakt</NavLi>
		<DarkMode class={topBarBtnClass}>
			<MoonSolid slot="darkIcon" />
			<SunSolid slot="lightIcon" />
		</DarkMode>
		<Tooltip arrow={false}>Darkmode ein- oder ausschalten</Tooltip>
	</NavUl>
</Navbar>

<!--Content goes here-->
<div class={contentContainerClass}>
	<slot></slot>
</div>

{#if showBottomNavbar}
	<!-- bottom element: back, info and next buttons-->
	<BottomNav position="absolute" classInner="grid-cols-3">
		<BottomNavItem href={lastpage} btnName="Zurück" btnClass={basicColorBehavior}>
			<CaretLeftSolid class={bottomBarBtnClass} />
			<Tooltip arrow={false}>Zur letzten Seite</Tooltip>
		</BottomNavItem>
		<BottomNavItem href={infopage} btnName="Hilfe" btnClass={basicColorBehavior}>
			<LightbulbSolid class={bottomBarBtnClass} />
			<Tooltip arrow={false}>Hilfe</Tooltip>
		</BottomNavItem>
		<BottomNavItem href={nextpage} btnName="Weiter" btnClass={basicColorBehavior}>
			<CaretRightSolid class={bottomBarBtnClass} />
			<Tooltip arrow={false}>Zur nächsten Seite</Tooltip>
		</BottomNavItem>
	</BottomNav>
{/if}
