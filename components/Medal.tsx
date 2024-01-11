import { Medal as MedalIcon } from '@/icons'
import type { ReactElement } from 'react'

export default function Medal({ medals }: { medals: (number | null)[] }) {
	let medalElement: ReactElement = <></>

	medals.forEach((medal, index) => {
		if (medal) return (medalElement = <MedalIcon type={index + 1} />)
	})

	return medalElement
}
