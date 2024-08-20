<script>
	import logo_dark from '$lib/assets/mondey_dark.svg';
	import logo_light from '$lib/assets/mondey_light.svg';
	import AbstractDropdown from '$lib/components/AbstractDropdown.svelte';
	import {
		Banner,
		DarkMode,
		Navbar,
		NavBrand,
		NavHamburger,
		NavLi,
		NavUl,
		P
	} from 'flowbite-svelte';
</script>

<Banner><P>This is a work-in-progress prototype frontend for the MONDEY website</P></Banner>
<Navbar>
	<NavBrand href="/">
		<img src={logo_light} class="block h-16 dark:hidden" alt="MONDEY Logo" />
		<img src={logo_dark} class="hidden h-16 dark:block" alt="MONDEY Logo" />
	</NavBrand>
	<NavHamburger />
	<NavUl>
		<NavLi href="/" active={true}>Home</NavLi>
		<NavLi href="/">Downloads</NavLi>
		<NavLi href="/">Aktuelles</NavLi>
		<NavLi href="/">Kontakt</NavLi>
	</NavUl>
	<DarkMode />
</Navbar>
<div class="flex flex-col items-center justify-center"></div>

<div>
	<AbstractDropdown></AbstractDropdown>
</div>
