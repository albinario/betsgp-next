'use client'
import SignInForm from './SignInForm'
import SignUpForm from './SignUpForm'
import { useState } from 'react'

export default function SignModal() {
	const [hasAccount, setHasAccount] = useState(true)

	const updateHasAccount = (val: boolean) => {
		setHasAccount(val)
	}

	return hasAccount ? (
		<SignInForm updateHasAccount={updateHasAccount} />
	) : (
		<SignUpForm updateHasAccount={updateHasAccount} />
	)
}
