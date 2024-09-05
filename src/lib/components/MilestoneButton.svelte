<script lang="ts">
    import {Tooltip} from 'flowbite-svelte';

    export let selected: boolean = false;
    export let color: string = 'white-900';
    export let tooltip: string = '';
    export let onClick: () => void;

    let bg_color = `bg-${color}`;
</script>

<button type="button" on:click={onClick}
        class={`${bg_color} ${selected ? 'opacity-100 outline-none ring-4 ring-blue-400' : 'opacity-50 hover:opacity-80'} border border-gray-200 rounded-lg font-medium border-1 px-5 py-3 m-1 md:my-2 text-center`}>
    <slot />
</button>
<Tooltip class={`${bg_color} text-gray-700 dark:${bg_color} dark:text-gray-700`}>
    {tooltip}
</Tooltip>