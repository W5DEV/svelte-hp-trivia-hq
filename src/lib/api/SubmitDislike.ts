export default async function SubmitDisike(question_id: string) {
	try {
		const response = await fetch(
			`https://hp-api.greatidea.dev/api/questions/dislike?questionsId=${question_id}`,
			{
				method: 'PUT'
			}
		);
		const data = await response.json();
		console.log(data);
		return data;
	} catch (error) {
		console.error(error);
	}
}
