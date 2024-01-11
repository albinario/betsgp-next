'use client'
import { user } from '@prisma/client'
import React, { createContext, useContext } from 'react'

type UserProviderProps = {
	children: React.ReactNode
	user: user | null
}

const UserContext = createContext<user | null>(null)

export function useUser() {
	return useContext(UserContext)
}

// export const someInfo = {
// 	balls: 'deep'
// }

export function UserProvider({ children, user }: UserProviderProps) {
	return <UserContext.Provider value={user}>{children}</UserContext.Provider>
}
