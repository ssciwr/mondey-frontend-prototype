<script context="module">
	// this will go into the backend at the end?

	export function splitDataIntoPages(datasize, pagesize) {
		let start = 0;
		let stop = pagesize;
		let indices = [];
		while (stop < datasize - pagesize) {
			stop = start + pagesize;
			indices.push([start, stop]);
			start = stop;
		}

		// add last element
		indices.push([start, datasize]);
		return indices;
	}
</script>

<script> 
    import GalleryDisplay from "./GalleryDisplay.svelte";
    import {Pagination, PaginationItem} from "flowbite-svelte";
</script>

