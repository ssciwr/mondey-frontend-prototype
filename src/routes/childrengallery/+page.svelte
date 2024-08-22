<script>
	import AbstractContent from '$lib/components/AbstractContent.svelte';
	import GalleryDisplay from '$lib/components/DataDisplay/GalleryDisplay.svelte';
	const data = [
		{
			name: 'A',
			age: 2,
			surveys: {
				name: 'making a mess',
				status: 'good'
			},
			tag: 'cohort1'
		},
		{
			name: 'B',
			age: 2,
			surveys: {
				name: 'making a mess',
				status: 'good'
			},
			tag: 'cohort1'
		},
		{
			name: 'C',
			age: 4,
			surveys: {
				name: 'making a mess',
				status: 'good'
			},
			tag: 'cohort2'
		},
		{
			name: 'D',
			age: 1,
			surveys: {
				name: 'making a mess',
				status: 'good'
			},
			tag: 'cohort1'
		},
		{
			name: 'E',
			age: 2,
			surveys: {
				name: 'making a mess',
				status: 'good'
			},
			tag: 'cohort1'
		},
		{
			name: 'F',
			age: 4,
			surveys: {
				name: 'making a mess',
				status: 'good'
			},
			tag: 'cohort2'
		}
	];
</script>

<AbstractContent
	showBottomNavbar={false}
	lastpage={'/'}
	nextpage={'/firstdropdown'}
	infopage="/info"
>
	<GalleryDisplay {data} />
</AbstractContent>
