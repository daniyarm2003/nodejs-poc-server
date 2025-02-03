import { Express, Request, Response } from 'express'
import BaseController from '@type/baseController'
import FileManager from '@files/fileManager'
import sendGenericAPIError from '@type/genericApiError'
import { contentType } from 'mime-types'
import FileNotFoundError from '@files/fileNotFoundError'

export default class FileShareController implements BaseController {
    private fileManager: FileManager
    
    public constructor(fileManager: FileManager) {
        this.fileManager = fileManager
    }

    public registerRoutes(app: Express) {
        app.get('/api/files', (this.getFileListHandler.bind(this)))
        app.get('/api/files/:fileName', this.getFileContentHandler.bind(this))
    }

    private async getFileListHandler(_: Request, res: Response) {
        try {
            const fileList = await this.fileManager.getFileList()
            res.json(fileList)
        }
        catch(err: unknown) {
            console.error(err)

            sendGenericAPIError(res, {
                status: 500,
                message: 'An unexpected error has occurred'
            })
        }
    }

    private async getFileContentHandler(req: Request, res: Response) {
        const fileName = req.params.fileName
        const mimeType = contentType(fileName) || 'application/octet-stream'
        
        try {
            const readStream = await this.fileManager.getReadStream(fileName)

            res.setHeader('Content-Type', mimeType)
            readStream.pipe(res)
        }
        catch(err: unknown) {
            console.error(err)

            if(err instanceof FileNotFoundError) {
                sendGenericAPIError(res, {
                    status: 404,
                    message: err.message
                })
            }
            else {
                sendGenericAPIError(res, {
                    status: 500,
                    message: 'An unexpected error has occurred'
                })
            }
        }
    }
}