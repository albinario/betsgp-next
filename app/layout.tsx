import './globals.css'
import Footer from '@/components/layout/Footer'
import Header from '@/components/layout/Header'
import { UserProvider } from '@/context/UserContext'
import getUserSession from '@/helpers/userSession.server'
import type { Metadata } from 'next'
import Container from 'react-bootstrap/Container'
import { ToastContainer } from 'react-toastify'
import { metadata as meta } from '@/theme'

export const metadata: Metadata = {
	title: meta.title,
	description: meta.description,
	authors: meta.authors
}

export default async function RootLayout({
	children
}: {
	children: React.ReactNode
}) {
	const user = await getUserSession()

	return (
		<html lang='en' data-bs-theme='dark'>
			<body>
				<UserProvider user={user}>
					<Container className='d-flex flex-column justify-content-between'>
						<div>
							<Header />
							{children}
						</div>
						<Footer />
					</Container>
				</UserProvider>
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
