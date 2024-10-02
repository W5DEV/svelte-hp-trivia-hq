type QuestionReport = {
	access_key?: string;
	subject?: string;
	question_id: string;
	question: string;
	answer_list: string[];
	correct_answer: string;
	provided_answer: string;
	correct: boolean;
};

export async function SubmitReport(question: QuestionReport) {
	question.access_key = '158aa036-6978-45e0-b4e2-780bd06ee898';
	question.subject = 'The below question has been reported by a user.';
	const json = JSON.stringify(question);
	try {
		const response = await fetch('https://api.web3forms.com/submit', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json'
			},
			body: json
		});
		const data = await response.json();
		console.log(data);
		return data;
	} catch (error) {
		console.error(error);
	}
}
