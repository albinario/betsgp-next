import { PrismaClient } from '@prisma/client'

let prisma: PrismaClient

if (process.env.NODE_ENV === 'production') {
	prisma = new PrismaClient({
		log: ['warn', 'error', 'query', 'info']
	})
} else {
	if (!global.prisma) {
		global.prisma = new PrismaClient({
			log: ['warn', 'error', 'query', 'info']
		})
	}
	prisma = global.prisma
}

export default prisma
