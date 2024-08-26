<script>
	import logo_dark from '$lib/assets/mondey_dark.svg';
	import logo_light from '$lib/assets/mondey_light.svg';
	import FunctionalIcon from '$lib/components/Navigation/FunctionalIcon.svelte';
	import { Avatar, DarkMode, Navbar, NavBrand, NavHamburger, NavLi, NavUl } from 'flowbite-svelte';
	import { MoonSolid, SunSolid } from 'flowbite-svelte-icons';
	import '../app.css';

	export let isLoggedIn = true;
</script>

<Navbar>
	<NavBrand href="/">
		<img src={logo_light} class="block h-16 dark:hidden" alt="MONDEY Logo" />
		<img src={logo_dark} class="hidden h-16 dark:block" alt="MONDEY Logo" />
	</NavBrand>
	<NavHamburger />
	<NavUl ulClass="flex space-x-4 text-lg ">
		<NavLi href="/" active={true}>Home</NavLi>
		<NavLi href="/">Aktuelles</NavLi>
		<NavLi href="/">Downloads</NavLi>
		<NavLi href="/">Kontakt</NavLi>

		<FunctionalIcon tooltip={'Darkmode ein- oder ausschalten'}>
			<DarkMode class="apply-icon-style">
				<MoonSolid slot="darkIcon" />
				<SunSolid slot="lightIcon" />
			</DarkMode>
		</FunctionalIcon>

		<FunctionalIcon tooltip={'Registrieren oder einloggen'}>
			<Avatar
				rounded
				class="apply-icon-style"
				href={isLoggedIn ? '/userLand/userRegistration' : '/userLand/userLogin'}
			/>
		</FunctionalIcon>
	</NavUl>
</Navbar>

<div class="mx-auto flex max-w-6xl justify-center overflow-y-auto p-4 pb-20">
	<slot></slot>
</div>
