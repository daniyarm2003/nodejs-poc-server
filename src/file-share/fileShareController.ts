import { Express, Request, Response } from 'express';
import BaseController from '@type/baseController'

export default class FileShareController implements BaseController {
    public registerRoutes(app: Express) {
        app.get('/api/files', this.getFileListHandler)
    }

    private async getFileListHandler(req: Request, res: Response) {
        
    }
}