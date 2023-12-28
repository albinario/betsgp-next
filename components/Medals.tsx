import { Medal } from '@/icons'
import { ReactElement } from 'react'

export default function Medals({ medals }: { medals: (number | null)[] }) {
	const medalsNode: ReactElement[] = []

	medals.forEach((medal, index) => {
		if (medal) {
			for (let i = 0; i < medal; i++) {
				medalsNode.push(<Medal type={index + 1} />)
			}
		}
	})

	return <div>{medalsNode}</div>
}
