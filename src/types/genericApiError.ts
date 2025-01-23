import { Response } from 'express'

export interface GenericAPIError {
    status: number,
    type?: string,
    message: string
}

export default function sendGenericAPIError(res: Response, error: GenericAPIError) {
    res.status(error.status).json(error)
}