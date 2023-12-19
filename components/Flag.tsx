import Flags from 'country-flag-icons/react/3x2'

type Flag = {
	height: string
	nationCode: string
}

export default function Flag({ height, nationCode }: Flag) {
	const FlagComponent = Flags[nationCode.toUpperCase() as keyof typeof Flags]
	return <FlagComponent style={{ height }} />
}
