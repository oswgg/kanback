import { Request, Response, NextFunction } from "express"
import { CustomError } from "./ErrorHandler"
import passport from "passport"
import { ErrorInterface } from "../interfaces/ErrorInterfaces"

const AuthorizationMiddleware = (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('jwt_auth', (err: any, user: any, info: any) => {
        try {
            if (info) {
                if (info.name === 'TokenExpiredError') {
                    const expiredError: ErrorInterface = {
                        statusCode: 401,
                        message: 'JWT token has expired',
                        content: {
                            type: 'JWTExpiredError',
                            token: req.headers.authorization,
                            expired_at: new Date(info.expiredAt)
                        }
                    }

                    throw new CustomError(expiredError)
                } else if (info.name === 'JsonWebTokenError') {
                    const tokenError: ErrorInterface = {
                        statusCode: 401,
                        message: 'Invalid JWT token',
                        content: {
                            type: 'JWTInvalidError',
                            token: req.headers.authorization,
                            message: 'Invalid JWT token'
                        }
                    }

                    throw new CustomError(tokenError)
                }
            }

            if (err || !user)
                throw err

            delete user.password
            req.user = user
            next()
        } catch (err: any) {
            if (err instanceof CustomError)
                return next(err)

            return next(new CustomError(null, err.message))
        }
    })(req, res, next)
}

export default AuthorizationMiddleware
