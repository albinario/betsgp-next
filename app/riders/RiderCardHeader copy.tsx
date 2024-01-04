import Flag from '../../components/Flag'
import CardImg from 'react-bootstrap/CardImg'

export default function RiderCardHeader({
	riderId,
	riderName,
	nationCode,
	number
}: {
	riderId: number
	riderName: string
	nationCode: string
	number: number
}) {
	return (
		<>
			<CardImg src={`/riders/${riderId}.jpg`} variant='top' />
			<div className='position-absolute p-2 w-100'>
				<div className='d-flex align-items-center justify-content-between'>
					<span className='overlay-text'>{riderName}</span>
					<Flag height={'1.5em'} nationCode={nationCode} />
				</div>
				<span className='overlay-text small'>{number}</span>
			</div>
		</>
	)
}
