<script lang="ts">
	import logo_dark from '$lib/assets/mondey_dark.svg';
	import logo_light from '$lib/assets/mondey_light.svg';
	import FunctionalIcon from '$lib/components/Navigation/FunctionalIcon.svelte';
	import UserProfile from '$lib/components/UserProfile.svelte';
	import { Avatar, DarkMode, Navbar, NavBrand, NavHamburger, NavLi, NavUl } from 'flowbite-svelte';
	import { MoonSolid, SunSolid } from 'flowbite-svelte-icons';
	import '../app.css';
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

		<FunctionalIcon>
			<Avatar rounded class="apply-icon-style" id="avatar" />
		</FunctionalIcon>
		<UserProfile triggeredBy="#avatar" />
	</NavUl>
</Navbar>

<div
	class="mx-[max(10vw,2rem)] my-[max(2vw,2rem)] flex-auto items-center justify-center overflow-y-auto pb-20"
>
	<slot></slot>
</div>
