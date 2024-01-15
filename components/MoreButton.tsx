import Link from 'next/link'
import Button from 'react-bootstrap/Button'

export default function MoreButton({ href }: { href: string }) {
	return (
		<Link href={href} className='d-grid p-2'>
			<Button size='sm' variant='outline-light'>
				More
			</Button>
		</Link>
	)
}
