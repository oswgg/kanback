import passport from 'passport'
import { Strategy } from 'passport-local'
import { Strategy as JWT_Strategy, ExtractJwt, StrategyOptionsWithoutRequest } from 'passport-jwt'
import { CustomError } from '../middlewares/ErrorHandler'
import { ForbiddenErrorFactory, NotFoundErrorFactory } from '../interfaces/ErrorInterfaces'
import UserService from '../../modules/User/services/userService'
import config from '../../config'
import { isValidPassword } from '../helpers'

passport.use('login',
    new Strategy({ usernameField: 'email', passwordField: 'password' },
        async (email, password, done) => {
            try {
                const user = await UserService.findOneBy({ email })

                if (!user) {
                    const notFoundUser = new NotFoundErrorFactory(
                        'User not found',
                        'User',
                        { email: email }
                    )

                    return done(new CustomError(notFoundUser), false)
                }

                const isGivenValidPassword: boolean = isValidPassword(user.password, password)

                if (!isGivenValidPassword) {
                    const notValidCredentials = new ForbiddenErrorFactory(
                        'Invalid user or password',
                        'User',
                        null,
                        { email, password }
                    )

                    return done(new CustomError(notValidCredentials), false)
                }

                return done(null, user)

            } catch (error: any) {
                throw error
            }
        }
    ))

const optsForJwt: StrategyOptionsWithoutRequest = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),

    secretOrKey: config.jwt_secret as string,
}

passport.use("jwt_auth",
    new JWT_Strategy(optsForJwt, async (jwt_payload: any, done: any) => {
        try {
            const user = await UserService.findOneBy({ id: jwt_payload.user.id })

            if (!user) {
                const notFoundUser = new NotFoundErrorFactory(
                    'User not found',
                    'User',
                    { id: jwt_payload.id }
                )
                return done(new CustomError(notFoundUser), false)
            }

            return done(null, user)
        } catch (err: any) {
            throw err
        }
    })
)
