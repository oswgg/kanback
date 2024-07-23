import { Request, Response, NextFunction } from "express"
import { CustomError } from "./ErrorHandler"
import config from '../../config'
import passport from "passport"
import jwt from 'jsonwebtoken'

const CheckCredentials = (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('login', (err: any, user: any, info: any) => {
        try {
            if (err || !user)
                throw err

            req.login(user, { session: false }, async (err) => {
                if (err)
                    throw err

                delete user.password
                const token = jwt.sign({ user }, config.jwt_secret as string)

                return res.json({ ok: true, content: { user, token } })
            })


        } catch (err: any) {
            if (err instanceof CustomError)
                return next(err)

            return next(new CustomError(err.message))
        }
    })(req, res, next)
}

export default CheckCredentials
