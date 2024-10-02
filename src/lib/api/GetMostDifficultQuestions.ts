export async function GetMostDifficultQuestions() {
	try {
		const response = await fetch(`https://hp-api.greatidea.dev/api/questions/difficulty`, {
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
