export function parseCookie(cookie: string) {
	try {
		const jsonPart = cookie.split('=')[1]
		const decodedCookie = jsonPart ? decodeURIComponent(jsonPart) : null

		return decodedCookie ? JSON.parse(decodedCookie) : null
	} catch (error) {
		return console.error('Failed to parse cookie:', error)
	}
}
