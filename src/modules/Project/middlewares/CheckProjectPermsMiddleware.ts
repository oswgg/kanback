import { Request, Response, NextFunction, RequestHandler } from 'express'
import { $Enums } from '@prisma/client'

const CheckProjectPermMiddleware = (acceptedMemberTypes: $Enums.ProjectMemberTypes[]): RequestHandler => {
    return (req: Request, res: Response, next: NextFunction) => {

    }
}

export default CheckProjectPermMiddleware
