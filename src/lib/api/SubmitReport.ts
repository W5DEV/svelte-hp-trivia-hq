type QuestionReport = {
	question_id: string;
	question: string;
	answer_list: string[];
	correct_answer: string;
	provided_answer: string;
	correct: boolean;
};

export async function SubmitReport(question: QuestionReport) {
	try {
		await fetch(
			'https://discord.com/api/webhooks/1291192656248176731/mK7rCEyR1gkfFKOyI6i2GRF7WRCaxRlQUGBnr1GIo6MRBOTcgrCnR970VJ_Otat6S-p_',
			{
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					thread_name: `New bug report from website!`,
					content:
						'The following question was reported via https://hp.trivia-hq.com. Please reply to this thread with any additional information.',
					embeds: [
						{
							title: 'Question Information',
							description: '',
							color: 5814783,
							fields: [
								{
									name: 'Question',
									value: question.question
								},
								{
									name: 'Correct Answer',
									value: question.correct_answer
								},
								{
									name: 'Provided Answer',
									value: question.provided_answer
								},
								{
									name: 'Correct?',
									value: question.correct ? 'Yes' : 'No'
								},
								{
									name: 'Available Answers',
									value: question.answer_list.join('\n')
								},
								{
									name: 'Question Id',
									value: question.question_id
								}
							]
						}
					],
					attachments: []
				}),
				method: 'POST'
			}
		);
		return;
	} catch (error) {
		console.error(error);
	}
}
