<script>
	import AbstractContent from '$lib/components/AbstractContent.svelte';

	const cardProps = {
		header: 'Child',
		summary: 'Summary',
		button: 'View',
		link: '/child',
		image: '/lib/assets/children.png'
	};

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
	<!-- <GalleryDisplay {data} itemComponent="{CardDisplay}," componentProps={cardProps} /> -->
</AbstractContent>
