import { Request, Response, NextFunction } from "express"
import { CustomError } from "./ErrorHandler"
import passport from "passport"

const AuthorizationMiddleware = (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('jwt_auth', (err: any, user: any, info: any) => {
        try {
            if (info) {
                if (info.name === 'TokenExpiredError') {
                    const expiredError = {
                        token: req.headers.authorization,
                        expired_at: new Date(info.expiredAt)
                    }

                    throw new CustomError('JWT has expired', 401, 'JWTExpiredError', expiredError)
                } else if (info.name === 'JsonWebTokenError') {
                    const tokenError = {
                        token: req.headers.authorization,
                        message: 'Invalid JWT token'
                    }

                    throw new CustomError('JWT has expired', 401, 'JWTInvalidError', tokenError)
                }
            }

            if (err || !user)
                throw err

            req.user = user
            next()
        } catch (err: any) {
            if (err instanceof CustomError)
                return next(err)

            return next(new CustomError(err.message))
        }
    })(req, res, next)
}

export default AuthorizationMiddleware
