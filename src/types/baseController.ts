import { Express } from 'express'

export default interface BaseController {
    registerRoutes: (app: Express) => void
}