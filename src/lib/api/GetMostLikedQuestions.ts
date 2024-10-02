export default async function GetMostLikedQuestions() {
	try {
		const response = await fetch(`https://hp-api.greatidea.dev/api/questions/most-liked`, {
			method: 'GET'
		});
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
