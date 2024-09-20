<script lang="ts">
    import {isLoggedIn} from '$lib/stores/adminStore';
    import MilestoneGroup from '$lib/components/Admin/MilestoneGroup.svelte';
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
    updateIsLoggedIn();

    let isLoggedInValue: boolean;
    const unsubscribe = isLoggedIn.subscribe((value) => {
        isLoggedInValue = value;
    });

</script>

<div class="flex flex-col justify-center items-center">
    {#if !isLoggedInValue}
        <Login/>
    {:else}
        <MilestoneGroup/>
    {/if}
</div>
