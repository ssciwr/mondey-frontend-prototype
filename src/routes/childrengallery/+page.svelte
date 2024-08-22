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
			tag: 'cohort1',
			image: '/lib/assets/children.png'
		},
		{
			name: 'B',
			age: 2,
			surveys: {
				name: 'making a mess',
				status: 'good'
			},
			tag: 'cohort1',
			image: '/lib/assets/children.png'
		},
		{
			name: 'C',
			age: 4,
			surveys: {
				name: 'making a mess',
				status: 'good'
			},
			tag: 'cohort2',
			image: '/lib/assets/children.png'
		},
		{
			name: 'D',
			age: 1,
			surveys: {
				name: 'making a mess',
				status: 'good'
			},
			tag: 'cohort1',
			image: '/lib/assets/children.png'
		},
		{
			name: 'E',
			age: 2,
			surveys: {
				name: 'making a mess',
				status: 'good'
			},
			tag: 'cohort1',
			image: '/lib/assets/children.png'
		},
		{
			name: 'F',
			age: 4,
			surveys: {
				name: 'making a mess',
				status: 'good'
			},
			tag: 'cohort2',
			image: '/lib/assets/children.png'
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
