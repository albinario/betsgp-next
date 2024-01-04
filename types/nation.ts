import { nation } from '@prisma/client'

export type NationNew = Omit<nation, 'id'>
