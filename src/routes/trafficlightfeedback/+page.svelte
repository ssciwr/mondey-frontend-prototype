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
			'30-03-2019': 'warn'
		},
		{
			name: 'SurveyB',
			'05-11-2017': 'bad',
			'08-05-2016': 'warn',
			'22-07-2012': 'bad',
			'11-11-2020': 'warn',
			'30-03-2019': 'good'
		},
		{
			name: 'SurveyC',
			'05-11-2017': 'good',
			'08-05-2016': 'warn',
			'22-07-2012': 'bad',
			'11-11-2020': 'warn',
			'30-03-2019': 'bad'
		},
		{
			name: 'SurveyD',
			'05-11-2017': 'good',
			'08-05-2016': 'good',
			'22-07-2012': 'good',
			'11-11-2020': 'warn',
			'30-03-2019': 'good'
		},
		{
			name: 'SurveyE',
			'05-11-2017': 'good',
			'08-05-2016': 'warn',
			'22-07-2012': 'warn',
			'11-11-2020': 'warn',
			'30-03-2019': 'good'
		}
	];

	const statusIndicator = {
		good: 'bg-green-500',
		bad: 'bg-red-600',
		warn: 'bg-yellow-300'
	};

	const searchableColumns = [
		'name',
		'05-11-2017',
		'08-05-2016',
		'22-07-2012',
		'11-11-2020',
		'30-03-2019'
	];

	const statusColumns = ['05-11-2017', '08-05-2016', '22-07-2012', '11-11-2020', '30-03-2019'];
</script>

<AbstractContent showBottomNavbar={true} lastpage="/surveyfeedback" nextpage="/" infopage="/info">
	<TableDisplay data={data_to_display} {statusIndicator} {searchableColumns} {statusColumns} />
</AbstractContent>
