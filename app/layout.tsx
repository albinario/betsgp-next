import Header from '@/components/common/Header'
import { AuthContextProvider } from '@/context/AuthContext'
import './globals.css'
import type { Metadata } from 'next'
import { ToastContainer } from 'react-toastify'
import { Container } from 'react-bootstrap'

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
					<Container>
						<Header />
						{children}
					</Container>
				</AuthContextProvider>
				<ToastContainer
					autoClose={3000}
					draggable
					newestOnTop
					pauseOnFocusLoss
					pauseOnHover
					position='bottom-right'
					theme='dark'
				/>
			</body>
		</html>
	)
}
