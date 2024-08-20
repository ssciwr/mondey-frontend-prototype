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

	const basicStyle = {
		basicBtnForm: 'rounded-lg text-xl p-2',
		basicColorBehavior:
			'text-gray-500 dark:text-gray-400 hover:text-primary-800 dark:hover:text-primary-500 group-hover:text-primary-800 dark:group-hover:text-primary-500'
	};

	const topNavStyle = {
		topBarBtnStyle: basicStyle.basicColorBehavior + basicStyle.basicBtnForm,
		navULStyle:
			'flex flex-col p-4 mt-4 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:text-lg md:font-medium'
	};

	const bottomNavStyle = {
		bottomBarBtnStyle: 'w-8 h-8 mb-1' + basicStyle.basicColorBehavior,
		bottomNavStyleInner: 'grid-cols-3'
	};

	const avatar_style = {
		outer: 'flex items-center space-x-4 rtl:space-x-reverse',
		avatar: 'flex items-center space-x-4 rtl:space-x-reverse',
		inner: 'space-y-1' + basicStyle.basicColorBehavior
	};
	const contentContainerStyle = 'mx-auto max-w-6xl p-4';
</script>

<!-- Top element-->
<Navbar>
	<NavBrand href="/">
		<img src={logo_light} class="block h-16 dark:hidden" alt="MONDEY Logo" />
		<img src={logo_dark} class="hidden h-16 dark:block" alt="MONDEY Logo" />
	</NavBrand>
	<NavHamburger />
	<NavUl ulClass={topNavStyle.navULStyle}>
		<NavLi href="/" active={true}>Home</NavLi>
		<NavLi href="/">Aktuelles</NavLi>
		<NavLi href="/">Downloads</NavLi>
		<NavLi href="/">Kontakt</NavLi>
		<DarkMode class={topNavStyle.topBarBtnStyle}>
			<MoonSolid slot="darkIcon" />
			<SunSolid slot="lightIcon" />
		</DarkMode>
		<Tooltip arrow={false}>Darkmode ein- oder ausschalten</Tooltip>
	</NavUl>
	<div class={avatar_style.outer}>
		<Avatar class={avatar_style.avatar} rounded border />
		<div class={avatar_style.inner}>{name}</div>
		<Tooltip>Registrieren oder einloggen</Tooltip>
	</div>
</Navbar>

<!--Content goes here-->
<div class={contentContainerStyle}>
	<slot></slot>
</div>

{#if showBottomNavbar}
	<!-- bottom element: back, info and next buttons-->
	<BottomNav position="absolute" classInner={bottomNavStyle.bottomNavStyleInner}>
		<BottomNavItem href={lastpage} btnName="Zurück" btnClass={bottomNavStyle.basicColorBehavior}>
			<CaretLeftSolid class={bottomNavStyle.bottomBarBtnStyle} />
			<Tooltip arrow={false}>Zur letzten Seite</Tooltip>
		</BottomNavItem>
		<BottomNavItem href={infopage} btnName="Hilfe" btnClass={bottomNavStyle.basicColorBehavior}>
			<LightbulbSolid class={bottomNavStyle.bottomBarBtnStyle} />
			<Tooltip arrow={false}>Hilfe</Tooltip>
		</BottomNavItem>
		<BottomNavItem href={nextpage} btnName="Weiter" btnClass={bottomNavStyle.basicColorBehavior}>
			<CaretRightSolid class={bottomNavStyle.bottomBarBtnStyle} />
			<Tooltip arrow={false}>Zur nächsten Seite</Tooltip>
		</BottomNavItem>
	</BottomNav>
{/if}
