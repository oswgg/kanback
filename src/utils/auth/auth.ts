import passport from 'passport'
import { Strategy } from 'passport-local'
import { CustomError } from '../middlewares/ErrorHandler'
import { ModelError } from '../interfaces/ErrorInterfaces'
import UserService from '../../modules/user/services/userService'

export const loginAuth = passport.use('login',
    new Strategy({ usernameField: 'email', passwordField: 'password' },
        async (email, password, done) => {
            try {
                const [user] = await UserService.findOneBy({ email })

                if (!user) {
                    const notFoundUser: ModelError = {
                        model: 'User',
                        message: 'User with this email not exists',
                        props: {
                            email: email
                        }
                    }
                    return done(new CustomError('User not found', 401, 'NotFoundError', notFoundUser), false)
                }


                const isValidPassword: boolean = UserService.isValidPassword(user.password, password)

                if (!isValidPassword) {
                    const invalidCred: ModelError = {
                        model: 'User',
                        message: 'Invalid user or password',
                        props: {
                            email: email,
                            password: password,
                        }
                    }
                    return done(new CustomError('Invalid credentials', 401, 'AuthorizationError', invalidCred))
                }

                return done(null, user)

            } catch (error: any) {
                throw error
            }
        }
    ))
