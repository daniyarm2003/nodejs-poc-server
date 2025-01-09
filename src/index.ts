import 'dotenv/config'
import { createPrismaClient } from '@lib/db'
import { initServer } from '@lib/server'

const main = async () => {
    const prisma = createPrismaClient()
    const server = initServer([])

    console.log('Done!')
}

main()