'use client'
import {
	createUserWithEmailAndPassword,
	onAuthStateChanged,
	sendPasswordResetEmail,
	signInWithEmailAndPassword,
	signOut,
	User
} from 'firebase/auth'
import { auth } from '../firebase/config'
import React, { createContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import type { ResetPassword, SignIn, SignUp } from '@/types/Auth.types'

export const AuthContext = createContext<AuthContextType | null>(null)

type AuthContextType = {
	resetPassword: (data: ResetPassword) => void
	signInUser: (data: SignIn) => void
	signOutUser: () => void
	signUpUser: (data: SignUp) => void
	user: User | null
}

export const AuthContextProvider = ({
	children
}: {
	children: React.ReactNode
}) => {
	const [user, setUser] = useState<User | null>(null)
	const [loading, setLoading] = useState<Boolean>(true)

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				setUser(user)
			} else {
				setUser(null)
			}
		})
		setLoading(false)
		return unsubscribe
	}, [])

	const resetPassword = async (data: ResetPassword) => {
		await sendPasswordResetEmail(auth, data.email)
		return toast.success('Instructions sent to ' + data.email)
	}

	const signInUser = async (data: SignIn) => {
		await signInWithEmailAndPassword(auth, data.email, data.password)
		return toast.success('Welcome back')
	}

	const signOutUser = async () => {
		setUser(null)
		await signOut(auth)
		return toast.success('Signed out')
	}

	const signUpUser = async (data: SignUp) => {
		const newUser = await createUserWithEmailAndPassword(
			auth,
			data.email,
			data.password
		)

		await fetch('api/users', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				email: data.email,
				firstName: data.firstName,
				lastName: data.lastName,
				uid: newUser.user.uid
			})
		})

		return toast.success('Welcome, ' + data.firstName)
	}

	return (
		<AuthContext.Provider
			value={{ resetPassword, signInUser, signOutUser, signUpUser, user }}
		>
			{loading ? null : children}
		</AuthContext.Provider>
	)
}
