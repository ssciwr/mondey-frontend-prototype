<script>
	import AbstractContent from '$lib/components/AbstractContent.svelte';
	import TableDisplay from '$lib/components/DataDisplay/TableDisplay.svelte';

	// this will be passed from the backend eventually
	const data_to_display = [
		{
			name: 'SurveyA',
			'05-11-2017': 'good',
			'08-05-2016': 'bad',
			'22-07-2012': 'bad',
			'11-11-2020': 'warn',
			'30-03-2019': 'warn',
			'01-06-2022': 'good',
			'30-12-2021': 'bad',
			'30-11-2021': 'good',
			'30-10-2021': 'good'
		},
		{
			name: 'SurveyB',
			'05-11-2017': 'bad',
			'08-05-2016': 'warn',
			'22-07-2012': 'bad',
			'11-11-2020': 'warn',
			'30-03-2019': 'good',
			'01-06-2022': 'bad',
			'30-12-2021': 'good',
			'30-11-2021': 'good',
			'30-10-2021': 'good'
		},
		{
			name: 'SurveyC',
			'05-11-2017': 'warn',
			'08-05-2016': 'warn',
			'22-07-2012': 'bad',
			'11-11-2020': 'warn',
			'30-03-2019': 'bad',
			'01-06-2022': 'good',
			'30-12-2021': 'good',
			'30-11-2021': 'good',
			'30-10-2021': 'bad'
		},
		{
			name: 'SurveyD',
			'05-11-2017': 'good',
			'08-05-2016': 'good',
			'22-07-2012': 'good',
			'11-11-2020': 'warn',
			'30-03-2019': 'good',
			'01-06-2022': 'good',
			'30-12-2021': 'good',
			'30-11-2021': 'good',
			'30-10-2021': 'good'
		},
		{
			name: 'SurveyE',
			'05-11-2017': 'good',
			'08-05-2016': 'warn',
			'22-07-2012': 'warn',
			'11-11-2020': 'warn',
			'30-03-2019': 'good',
			'01-06-2022': 'good',
			'30-12-2021': 'good',
			'30-11-2021': 'warn',
			'30-10-2021': 'good'
		}
	];

	const statusIndicator = {
		good: 'bg-green-500',
		bad: 'bg-red-600',
		warn: 'bg-yellow-300'
	};

	const searchableColumns = Object.keys(data_to_display[0]).filter((key) => key !== 'name');

	const caption =
		'Here you see an overview of all completed and outstanding milestones for the current inventory.';

	const statusColumns = Object.keys(data_to_display[0]).filter((key) => key !== 'name');
</script>

<AbstractContent showBottomNavbar={true} lastpage="/surveyfeedback" nextpage="/" infopage="/info">
	<TableDisplay
		{caption}
		data={data_to_display}
		{statusIndicator}
		{searchableColumns}
		{statusColumns}
	/>
</AbstractContent>
