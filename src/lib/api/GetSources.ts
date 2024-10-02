import { sources, type Source } from '../../store';

export async function GetSources() {
	try {
		const response = await fetch(
			'https://hp-api.greatidea.dev/api/sources/topic?topic=Harry Potter',
			{
				method: 'GET'
			}
		);
		if (response.ok) {
			const data = await response.json();
			// set sources = data.data and sort by data.order
			sources.set(
				data.data
					.sort((a: Source, b: Source) => a.order - b.order)
					.filter((origin: Source) => origin.status === 'completed')
			);
		} else {
			alert(response.status + ': Error retrieving questions.');
		}
	} catch (error) {
		console.error(error);
	}
}
