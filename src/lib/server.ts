import BaseController from '@type/baseController'
import express from 'express'
import cors from 'cors'

export function initServer(controllers: BaseController[]) {
    const app = express()

    app.use(express.urlencoded({ extended: true }))
    app.use(express.json())
    app.use(cors())

    controllers.forEach(controller => controller.registerRoutes(app))

    const port = parseInt(process.env.SERVER_PORT ?? '')

    if(isNaN(port) || port < 0 || port > 65535) {
        throw new Error('Server port number is either missing or invalid')
    }

    return app.listen(port, () => console.log('Server is listening...'))
}