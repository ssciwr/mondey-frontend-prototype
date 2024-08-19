<script> 
    import {
    	DarkMode,
    	Navbar,
    	NavBrand,
    	NavHamburger,
    	NavLi,
    	NavUl
    } from 'flowbite-svelte';

    import {
    	MoonSolid,
    	SunSolid
    } from 'flowbite-svelte-icons';

    import logo_dark from '../assets/mondey_dark.svg';
    import logo_light from '../assets/mondey_light.svg';
</script>


<Navbar > 
<NavBrand href="/"> 
	<img src={logo_light} class="block h-16 dark:hidden" alt="MONDEY Logo" />
	<img src={logo_dark} class="hidden h-16 dark:block" alt="MONDEY Logo" />
</NavBrand>
<NavHamburger />
<NavUl>
    <NavLi href="/" active={true}>Home</NavLi>
    <NavLi href="/">Aktuelles</NavLi>
    <NavLi href="/">Downloads</NavLi>
    <NavLi href="/">Kontakt</NavLi>
    <DarkMode class='text-lg'>
        <MoonSolid slot="lightIcon"  color="var(--primary-500)"/>
        <SunSolid slot="darkIcon" color="var(--dark-primary-500)"/> 
    </DarkMode>
</NavUl>

</Navbar>