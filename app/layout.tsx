import './globals.css'
import Footer from '@/components/layout/Footer'
import Header from '@/components/layout/Header'
import type { Metadata } from 'next'
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
	// console.log(session)

	return (
		<html lang='en' data-bs-theme='dark'>
			<body>
				<Container>
					<Header user={session.data.session?.user} />
					{children}
					<Footer />
				</Container>
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
