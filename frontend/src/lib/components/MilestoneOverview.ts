import { CheckCircleSolid, ExclamationCircleSolid } from 'flowbite-svelte-icons';

export function convertData(data: object[]): object[] {
	return data.map((item) => {
		return {
			header: item.title,
			href: `${base}/milestone`, // hardcoded link for the moment
			complete: item.answer !== null,
			summary: item.desc,
			answer: item.answer,
			auxilliary: item.answer !== null ? CheckCircleSolid : ExclamationCircleSolid
		};
	});
}
