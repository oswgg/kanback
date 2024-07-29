import { Request, Response, NextFunction, RequestHandler } from 'express'
import { $Enums } from '@prisma/client'

const CheckProjectRoleMiddleware = (acceptedMemberTypes: $Enums.ProjectMemberTypes[]): RequestHandler => {
    return (req: Request, res: Response, next: NextFunction) => {

    }
}

export default CheckProjectRoleMiddleware
