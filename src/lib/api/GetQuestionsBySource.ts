export default async function GetQuestionsBySource(source: string) {
	try {
		const response = await fetch(
			`https://hp-api.greatidea.dev/api/questions/origin?question_origin=${source}`,
			{
				method: 'GET'
			}
		);
		if (response.ok) {
			const data = await response.json();
			return data.data;
		} else {
			alert(response.status + ': Error retrieving questions.');
		}
	} catch (error) {
		console.error(error);
	}
}
