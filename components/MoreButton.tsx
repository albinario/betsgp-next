import Link from 'next/link'
import Button from 'react-bootstrap/Button'

export default function MoreButton({ href }: { href: string }) {
	return (
		<Link href={href} className='d-grid opacity-50 p-2'>
			<Button size='sm' variant='outline-warning'>
				More
			</Button>
		</Link>
	)
}
