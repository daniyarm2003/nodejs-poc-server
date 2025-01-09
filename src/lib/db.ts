import { PrismaClient } from '@prisma/client'

export function createPrismaClient() {
    if(process.env.NODE_ENV === 'development') {
        const url = process.env.POSTGRES_URL ?? process.env.POSTGRES_PRISMA_URL

        if(!url) {
            throw new Error('Development environment database URL is missing.')
        }

        const username = process.env.POSTGRES_USERNAME ?? 'postgres'
        const password = process.env.POSTGRES_PASSWORD
        const port = parseInt(process.env.POSTGRES_PORT || '')
        const database = process.env.POSTGRES_DATABASE ?? 'postgres'

        if(!password) {
            throw new Error('Development environment database password is missing.')
        }

        if(isNaN(port)) {
            throw new Error('Development environment port is missing or not a number.')
        }

        const datasourceUrl = `postgresql://${username}:${password}@${url}:${port}/${database}?schema=public`

        return new PrismaClient({
            datasourceUrl
        })
    }

    return new PrismaClient()
}