export function parseCookie(cookie: string) {
	try {
		const jsonPart = cookie.split('=')[1]
		const decodedCookie = decodeURIComponent(jsonPart)

		return JSON.parse(decodedCookie)
	} catch (error) {
		return console.error('Failed to parse cookie:', error)
	}
}
