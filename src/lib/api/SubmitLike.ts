export default async function SubmitLike(question_id: string) {
	try {
		const response = await fetch(
			`https://hp-api.greatidea.dev/api/questions/like?questionsId=${question_id}`,
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
