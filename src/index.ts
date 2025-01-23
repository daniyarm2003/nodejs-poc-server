import 'dotenv/config'
import { createPrismaClient } from '@lib/db'
import { initServer } from '@lib/server'
import LocalFileManager from '@files/localFileManager'
import FileShareController from 'file-share/fileShareController'

const main = async () => {
    const prisma = createPrismaClient()
    const fileManager = new LocalFileManager('file-dir')

    initServer([
        new FileShareController(fileManager)
    ])

    console.log('Done!')
}

main()