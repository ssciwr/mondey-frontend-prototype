<script lang="ts">
    import MilestoneGroup from '$lib/components/Admin/MilestoneGroup.svelte';
    let data = {
        "group": {"order": 0, "image": ""},
        "text": [
            {"lang": "en", "title": "title1", "desc": "desc1"},
            {"lang": "de", "title": "title2", "desc": "desc2"},
        ],
    }
</script>

<div class="flex justify-center items-center">
    <MilestoneGroup data="{data}"/>
</div>
