export const isIdentical = (
	arr1: (number | null)[],
	arr2: (number | null)[]
) => {
	if (arr1.length !== arr2.length) return false

	for (let i = 0; i < arr1.length; i++) {
		if (arr1[i] !== arr2[i]) return false
	}
	return true
}
