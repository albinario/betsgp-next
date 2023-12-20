export const getNations = async () => {
	const res = await fetch('api/nations')
	return await res.json()
}
