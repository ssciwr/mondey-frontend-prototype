<script lang="ts">
    import {isLoggedIn} from '$lib/stores/adminStore';
    import MilestoneGroup from '$lib/components/Admin/MilestoneGroup.svelte';
    import Login from '$lib/components/Admin/Login.svelte'

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
