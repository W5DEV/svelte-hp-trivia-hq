export default async function SubmitAnswer(question_id: string, answer: string) {
	try {
		const response = await fetch(
			`https://hp-api.greatidea.dev/api/questions/answer?questionsId=${question_id}&answer=${answer}`,
			{
				method: 'PUT'
			}
		);
		const data = await response.json();
		return data.correct;
	} catch (error) {
		console.error(error);
	}
}
