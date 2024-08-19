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

	// button stylings
	export const basicBtnForm = 'rounded-lg text-xl p-2';

	export const basicBtnColor =
		'text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700';

	export const topBarBtnClass = basicBtnColor + basicBtnForm;

	export const bottomBarBtnClass =
		'w-8 h-8 mb-1 group-hover:text-primary-800 dark:group-hover:text-primary-500' + basicBtnColor;

	// styling for the nav
	const navULclass =
		'flex flex-col p-4 mt-4 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:text-lg md:font-medium';

    // variables for communication upon hitting the page
	// FIXME: these are placehorlders and must later be changed using contexts or other better mechanisms for inter component comunication
	$: lastpage = '/';
	$: nextpage = '/';
	$: infopage = '/';
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

<!-- bottom element: back, info and next buttons-->
<BottomNav position="absolute" navType="application" classInner="grid-cols-3">
	<BottomNavItem href={lastpage} appBtnPosition="left" btnName="Back" btnClass={topBarBtnClass}>
		<CaretLeftSolid class={bottomBarBtnClass} />
		<Tooltip arrow={false}>Zur letzten Seite</Tooltip>
	</BottomNavItem>
	<BottomNavItem href={infopage} appBtnPosition="middle" btnName="Help" btnClass={topBarBtnClass}>
		<LightbulbSolid class={bottomBarBtnClass} />
		<Tooltip arrow={false}>Hilfe</Tooltip>
	</BottomNavItem>
	<BottomNavItem href={nextpage} appBtnPosition="right" btnName="Next" btnClass={topBarBtnClass}>
		<CaretRightSolid class={bottomBarBtnClass} />
		<Tooltip arrow={false}>Zur naechsten Seite</Tooltip>
	</BottomNavItem>
</BottomNav>
