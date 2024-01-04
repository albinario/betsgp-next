import './globals.css'
import AnimationWrapper from '@/components/AnimationWrapper'
import Footer from '@/components/common/Footer'
import Header from '@/components/common/Header'
import type { Metadata } from 'next'
import Container from 'react-bootstrap/Container'
import { ToastContainer } from 'react-toastify'
import { metadata as meta } from '@/theme'
import { readSession } from '@/supabase/service'

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
					<AnimationWrapper>{children}</AnimationWrapper>
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
