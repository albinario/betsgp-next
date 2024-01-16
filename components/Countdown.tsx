'use client'
import { getDateTimeLocal, getNowLocal } from '@/helpers/dateTime'
import { useEffect, useState } from 'react'
import Badge from 'react-bootstrap/Badge'

export default function Countdown({ dateTime }: { dateTime: Date }) {
	const [timeLeft, setTimeLeft] = useState<string[]>([])

	const dateTimeLocal = getDateTimeLocal(dateTime)

	const format = (value: number) => {
		return Math.floor(value).toString().padStart(2, '0')
	}

	useEffect(() => {
		const interval = setInterval(() => {
			const now = getNowLocal()
			const diff = dateTimeLocal.diff(now)
			const secondsTotal = diff.as('seconds')

			if (secondsTotal) {
				const days = format(secondsTotal / 86400)
				const hours = format((secondsTotal % 86400) / 3600)
				const minutes = format((secondsTotal % 3600) / 60)
				const seconds = format(secondsTotal % 60)

				setTimeLeft([days, hours, minutes, seconds])
			} else {
				clearInterval(interval)
			}
		}, 1000)
		return () => clearInterval(interval)
	}, [dateTimeLocal])

	return timeLeft.length ? (
		<div className='d-flex justify-content-center gap-2 p-2 text-warning'>
			{['d', 'h', 'm', 's'].map((item, index) => (
				<span key={index} className='d-flex gap-1'>
					<Badge
						bg='warning'
						className='d-flex justify-content-center'
						style={{ width: '30px' }}
						text='dark'
					>
						{timeLeft[index]}
					</Badge>
					<span className='small'>{item}</span>
				</span>
			))}
		</div>
	) : (
		<></>
	)
}
