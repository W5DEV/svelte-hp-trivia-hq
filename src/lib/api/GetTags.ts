export async function GetTags() {
	try {
		const response = await fetch(`https://hp-api.greatidea.dev/api/questions/tags`, {
			method: 'GET'
		});
		if (response.ok) {
			const data = await response.json();
			data.data = data.data.filter((tag: string) => tag !== '');
			return data.data;
		} else {
			alert(response.status + ': Error retrieving tags.');
		}
	} catch (error) {
		console.error(error);
	}
}
