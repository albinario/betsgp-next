export async function postToApi<T>(data: T, url: string, token?: string) {
	await fetch('api/' + url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`
		},
		body: JSON.stringify(data)
	})
}
