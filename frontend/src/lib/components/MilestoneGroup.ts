import { children } from '$lib/stores/childrenStore';
import { users } from '$lib/stores/userStore';

export function createStyle(data: any[]) {
	return data.map((item) => {
		return {
			card: {
				class: 'm-2 max-w-prose dark:text-white text-gray-700 hover:cursor-pointer '
			},
			header: null,
			summary: null,
			progress: {
				labelInsideClass: 'h-4 rounded-full text-xs text-center text-white',
				size: 'h-4',
				divClass: `h-full rounded-full w-${100 * item.progress}`,
				color: 'primary',
				completeColor: 'green'
			}
		};
	});
}

export function getData() {

}