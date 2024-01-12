'use client'
import { SignOut as SignOutIcon } from '@/icons'
import Button from 'react-bootstrap/Button'
import { toast } from 'react-toastify'
import { signOutUser } from '@/supabase/service'

export default function SignOut() {
	const onSignOut = async () => {
		try {
			await signOutUser()

			toast.success('Signed out')
		} catch (error) {
			toast.error('Something went wrong when trying to sign out')
		}
	}

	return (
		<div className='d-grid g-2 mt-3'>
			<Button
				className='d-flex align-items-center justify-content-center gap-1'
				onClick={onSignOut}
				size='sm'
				variant='danger'
			>
				Sign out <SignOutIcon />
			</Button>
		</div>
	)
}
