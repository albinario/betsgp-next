'use client'
import {
	createUserWithEmailAndPassword,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signOut,
	User
} from 'firebase/auth'
import { auth } from '../firebase/config'
import React, { createContext, useEffect, useState } from 'react'

export const AuthContext = createContext<AuthContextType | null>(null)

type AuthContextType = {
	user: User | null
	signInUser: (email: string, password: string) => void
	signOutUser: () => void
	signUpUser: (email: string, password: string) => void
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

	const signInUser = (email: string, password: string) =>
		signInWithEmailAndPassword(auth, email, password)

	const signOutUser = async () => {
		setUser(null)
		return await signOut(auth)
	}

	const signUpUser = (email: string, password: string) =>
		createUserWithEmailAndPassword(auth, email, password)

	return (
		<AuthContext.Provider value={{ user, signUpUser, signInUser, signOutUser }}>
			{loading ? null : children}
		</AuthContext.Provider>
	)
}
