import { Router } from 'express'
const router = Router()

import userController from './controller/userController'

import { SchemaValidation } from '../../utils/middlewares/SchemaValidationMiddleware'
import signupSchema from './schemas/signup'

export default (app: Router) => {
    app.use('/users', router)

    router.post(
        '/signup',
        SchemaValidation(signupSchema),  // Validate request body against the schema
        userController.signup
    )

}
