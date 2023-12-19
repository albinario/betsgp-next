import Flags from 'country-flag-icons/react/3x2'

type Flag = {
	className: string
	nationCode: string
}

export default function Flag({ className, nationCode }: Flag) {
	const FlagComponent = Flags[nationCode.toUpperCase() as keyof typeof Flags]
	return <FlagComponent className={className} />
}
