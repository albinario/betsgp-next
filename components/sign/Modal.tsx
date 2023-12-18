'use client'
import SignInForm from './InForm'
import SignUpForm from './UpForm'
import { useState } from 'react'
import type { Form } from '@/types/Auth.types'
import ResetPasswordForm from './ResetPasswordForm'

export default function SignModal({ hideModal }: { hideModal: () => void }) {
	const [form, setForm] = useState<Form>('in')

	const _setForm = (form: Form) => {
		setForm(form)
	}

	return form === 'up' ? (
		<SignUpForm setForm={_setForm} hideModal={hideModal} />
	) : form === 'reset' ? (
		<ResetPasswordForm setForm={_setForm} hideModal={hideModal} />
	) : (
		<SignInForm setForm={_setForm} hideModal={hideModal} />
	)
}
