import { getCurrentYear } from '@/helpers/dateTime'

export default function Footer() {
	return (
		<div className='d-flex justify-content-end mt-2 py-2 small text-muted'>
			Copyright 2020-{getCurrentYear()}
		</div>
	)
}
