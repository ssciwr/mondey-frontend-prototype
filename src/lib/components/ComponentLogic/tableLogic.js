export function filterItems(data, searchTerm, searchableColumns) {
	return data.filter((item) =>
		searchableColumns.some((column) => item[column]?.toString().includes(searchTerm))
	);
}

export function makePlaceholderText(data, searchableColumns) {
	const numCols = Object.keys(data[0]).length;
	let placeholderText = 'Search ';

	if (searchableColumns.length === 1) {
		placeholderText = placeholderText + searchableColumns[0];
	} else if (searchableColumns.length > 1 && searchableColumns.length <= numCols / 2) {
		placeholderText = 'Search ' + `any of ${searchableColumns.join(', ')}`;
	} else if (searchableColumns.length > numCols / 2 && searchableColumns.length < numCols) {
		const difference = Object.keys(data[0]).filter((key) => !searchableColumns.includes(key));
		placeholderText = 'Search all columns except ' + `${difference.join(', ')}`;
	} else if (searchableColumns.length === numCols) {
		placeholderText = 'Search all columns';
	} else {
		placeholderText = 'Search disabled';
	}

	return placeholderText;
}
