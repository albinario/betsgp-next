import { Medal } from '@/icons'
import { ReactElement } from 'react'

export default function Medals({ medals }: { medals: (number | null)[] }) {
	const medalsElement: ReactElement[] = []

	medals.forEach((medal, index) => {
		if (medal) {
			for (let i = 0; i < medal; i++) {
				medalsElement.push(
					<Medal key={Number(String(index) + String(medal))} type={index + 1} />
				)
			}
		}
	})

	return <div className='d-flex justify-content-center'>{medalsElement}</div>
}
