import Flags from 'country-flag-icons/react/3x2'

export default function Flag({
	height,
	nationCode
}: {
	height: string
	nationCode?: string
}) {
	const FlagComponent = nationCode
		? Flags[nationCode.toUpperCase() as keyof typeof Flags]
		: null

	return FlagComponent ? <FlagComponent style={{ height }} /> : null
}
