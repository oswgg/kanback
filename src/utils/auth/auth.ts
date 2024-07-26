import passport from 'passport'
import { Strategy } from 'passport-local'
import { Strategy as JWT_Strategy, ExtractJwt, StrategyOptionsWithoutRequest } from 'passport-jwt'
import { CustomError } from '../middlewares/ErrorHandler'
import { ErrorInterface, NotFoundError } from '../interfaces/ErrorInterfaces'
import UserService from '../../modules/user/services/userService'
import config from '../../config'
import { User } from '@prisma/client'

passport.use('login',
    new Strategy({ usernameField: 'email', passwordField: 'password' },
        async (email, password, done) => {
            try {
                const user = await UserService.findOneBy({ email })

                if (!user) {
                    const notFoundUser: NotFoundError = {
                        statusCode: 404,
                        message: 'User with this email not exists',
                        content: {
                            type: 'NotFoundError',
                            model: 'User',
                            props: {
                                email: email
                            }
                        }
                    }
                    return done(new CustomError(notFoundUser), false)
                }

                const isValidPassword: boolean = UserService.isValidPassword(user.password, password)

                if (!isValidPassword) {
                    const invalidCred: ErrorInterface = {
                        statusCode: 401,
                        message: 'Invalid user or password',
                        content: {
                            type: 'AuthorizationError',
                            model: 'User',
                            props: {
                                email: email,
                                password: password,
                            }
                        }
                    }
                    return done(new CustomError(invalidCred))
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
                const notFoundUser: NotFoundError = {
                    statusCode: 404,
                    message: 'User with this id does not exist',
                    content: {
                        model: 'User',
                        type: 'NotFoundError',
                        props: {
                            id: jwt_payload.id
                        }
                    }
                }

                return done(new CustomError(notFoundUser), false)
            }

            return done(null, user)
        } catch (err: any) {
            throw err
        }
    })
)
