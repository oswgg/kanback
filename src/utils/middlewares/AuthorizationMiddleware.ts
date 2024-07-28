import { Request, Response, NextFunction } from "express"
import { CustomError } from "./ErrorHandler"
import passport from "passport"
import { ErrorFactory } from "../interfaces/ErrorInterfaces"

const AuthorizationMiddleware = (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('jwt_auth', (err: any, user: any, info: any) => {
        try {
            if (info) {
                if (info.name === 'TokenExpiredError') {
                    const expiredTokenError = new ErrorFactory(
                        401,
                        'JWT token has expired',
                        {
                            type: 'JWTExpiredError',
                            token: req.headers.authorization,
                            expired_at: new Date(info.expiredAt)
                        }
                    )

                    throw new CustomError(expiredTokenError)

                } else if (info.name === 'JsonWebTokenError') {
                    const invalidTokenError = new ErrorFactory(
                        401,
                        'Invalid JWT Token',
                        {
                            type: 'JWTInvalidError',
                            token: req.headers.authorization,
                        }
                    )


                    throw new CustomError(invalidTokenError)

                } else if (info.message === 'No auth token') {
                    const noneTokenGiven = new ErrorFactory(
                        401,
                        'None JWT Token was given',
                    )

                    throw new CustomError(noneTokenGiven)
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
