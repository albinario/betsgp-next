import { Star } from '@/icons'
import { Fragment, ReactElement } from 'react'
import type { userStar } from '@prisma/client'

export default function Stars({
	isSup,
	userStars
}: {
	isSup: boolean
	userStars: userStar[]
}) {
	const starsElement: ReactElement[] = []

	userStars.forEach((userStar) => {
		const starElement = (
			<Star type={userStar.type} width={isSup ? 10 : 16} year={userStar.year} />
		)
		starsElement.push(
			<Fragment key={userStar.id}>
				{isSup ? <sup>{starElement}</sup> : starElement}
			</Fragment>
		)
	})

	return <>{starsElement}</>
}
