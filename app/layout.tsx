import './globals.css'
import Footer from '@/components/layout/Footer'
import Header from '@/components/layout/Header'
import { UserProvider } from '@/context/UserContext'
import type { Metadata } from 'next'
import { getUserRaw } from '@/prisma/service'
import Container from 'react-bootstrap/Container'
import { ToastContainer } from 'react-toastify'
import { readSession } from '@/supabase/service'
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
	const session = await readSession()
	const userSession = session.data.session?.user
	const user = userSession ? await getUserRaw(userSession.id) : null

	return (
		<html lang='en' data-bs-theme='dark'>
			<body>
				<UserProvider user={user}>
					<Container>
						<Header />
						{children}
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
