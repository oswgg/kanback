import { $Enums } from "@prisma/client"
import { NextFunction, Request, Response } from "express"
import { ForbiddenErrorFactory } from "../interfaces/ErrorInterfaces"
import { CustomError } from "./ErrorHandler"

const CheckUserRoleMiddleware = (allowedRoles: $Enums.OrgRole[], action: string) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            const { authUser } = req

            if (!allowedRoles.includes(authUser.role)) {
                const unauthorizedError = new ForbiddenErrorFactory(
                    `Cannot ${action}`,
                    'User',
                    { role: allowedRoles }
                )

                throw new CustomError(unauthorizedError)
            }

            return next()
        } catch (err: any) {
            if (err instanceof CustomError)
                return next(err)


            return next(new CustomError(null, err.message))
        }
    }
}

export default CheckUserRoleMiddleware
