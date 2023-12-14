import { NextRequest, NextResponse } from 'next/server'
import prisma from '../../prismaClient'

export async function GET(request: NextRequest) {
	const users = await prisma.user.findMany()
	console.log(request.nextUrl.searchParams.get('sort'))

	return NextResponse.json(users)
}

// const getUsers = async (req: NextApiRequest, res: NextApiResponse<User[]>) => {
// 	// const newUser = await prisma.user.create({
// 	//   data: {
// 	//     name: 'Albin',
// 	//     email: 'albin.lindeborg@gmail.com',
// 	//     image: ''
// 	//   },
// 	// });

// 	console.log(req)

// 	const users = await prisma.user.findMany()
// 	res.status(200).json(users)
// }

// export default getUsers
