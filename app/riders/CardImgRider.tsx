'use client'
import { useState } from 'react'
import { CardImg } from 'react-bootstrap'

export default function CardImgRider({ riderId }: { riderId: number }) {
	const [imgId, setImgId] = useState(riderId)

	return (
		<CardImg
			src={`/riders/${imgId}.jpg`}
			variant='top'
			onError={() => setImgId(0)}
		/>
	)
}
