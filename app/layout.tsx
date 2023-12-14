import { AuthContextProvider } from '@/context/AuthContext'
import './globals.css'
import type { Metadata } from 'next'
import Header from '@/components/common/Header'

export const metadata: Metadata = {
	title: 'Bet SGP',
	description: 'define Bet SGP',
	authors: [{ name: 'Albin Lindeborg', url: 'albinlindeborg.surge.sh' }]
}

export default function RootLayout({
	children
}: {
	children: React.ReactNode
}) {
	return (
		<html lang='en' data-bs-theme='dark'>
			<body>
				<AuthContextProvider>
					<Header />
					{children}
				</AuthContextProvider>
			</body>
		</html>
	)
}
