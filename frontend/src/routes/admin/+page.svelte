<script lang="ts">
    import {isLoggedIn} from '$lib/stores/adminStore';
    import MilestoneGroup from '$lib/components/Admin/MilestoneGroup.svelte';
    import MilestoneGroups from '$lib/components/Admin/MilestoneGroups.svelte';
    import Login from '$lib/components/Admin/Login.svelte'

    async function updateIsLoggedIn(){
        const res = await fetch("http://localhost:8000/users/me", {
            method: 'GET',
            credentials: 'include',
        });
        if (res.status === 200) {
            isLoggedIn.set(true);
        }
    }
    // commented out for now to avoid breaking github pages build
    // updateIsLoggedIn();

    let isLoggedInValue: boolean;
    const unsubscribe = isLoggedIn.subscribe((value) => {
        isLoggedInValue = value;
    });

</script>

<div class="flex flex-col justify-center items-center w-full">
    {#if !isLoggedInValue}
        <Login/>
    {:else}
        <MilestoneGroups/>
        <MilestoneGroup/>
    {/if}
</div>
