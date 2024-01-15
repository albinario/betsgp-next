import Flag from '@/components/Flag'
import { getDateTimeLocalFormatted } from '@/helpers/dateTime'
import CardImg from 'react-bootstrap/CardImg'

export default function GPCardHeader({
	cityId,
	cityName,
	nationCode,
	dateTime,
	round,
	rounds
}: {
	cityId: number
	cityName: string
	nationCode: string
	dateTime: Date
	round: number
	rounds: number
}) {
	return (
		<>
			<CardImg src={`/cities/${cityId}.jpg`} variant='top' />
			<div className='position-absolute p-2 w-100'>
				<div className='d-flex align-items-center justify-content-between'>
					<span className='overlay-text'>{cityName}</span>
					<Flag height={'1.5em'} nationCode={nationCode} />
				</div>

				<span className='small overlay-text'>
					{getDateTimeLocalFormatted(dateTime)}
				</span>

				<span className='small overlay-text'>
					Round {round} of {rounds}
				</span>
			</div>
		</>
	)
}
