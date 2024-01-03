'use client'
import SignIn from './In'
import SignUp from './Up'
import ResetPassword from './ResetPassword'
import { useState } from 'react'
import type { Form } from '@/types'

export default function SignModal({ hideModal }: { hideModal: () => void }) {
	const [form, setForm] = useState<Form>('in')

	const _setForm = (form: Form) => {
		setForm(form)
	}

	return form === 'up' ? (
		<SignUp hideModal={hideModal} setForm={_setForm} />
	) : form === 'reset' ? (
		<ResetPassword hideModal={hideModal} setForm={_setForm} />
	) : (
		<SignIn hideModal={hideModal} setForm={_setForm} />
	)
}
