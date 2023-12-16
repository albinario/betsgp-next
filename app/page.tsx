import Users from '@/components/Users'

export default function Home() {
	return (
		<>
			{/* @ts-expect-error Server Component */}
			<Users />
		</>
	)
}
