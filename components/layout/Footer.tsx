import { getCurrentYear } from '@/helpers/dateTime'
import { Copyright } from '@/icons'

export default function Footer() {
	return (
		<div className='d-flex align-items-center justify-content-end gap-1 mt-2 py-2 small text-muted'>
			A Lindeborg <Copyright /> 2020-{getCurrentYear()}
		</div>
	)
}
