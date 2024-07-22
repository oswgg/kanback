import { Router } from 'express'
const router = Router()
import passport from 'passport'

// ----------- MIDDLEWARES ---------
import SchemaValidation from '../../utils/middlewares/SchemaValidation'
import CheckCredentials from '../../utils/middlewares/CheckCredentials'

// ----------- CONTROLLER ----------
import userController from './controller/userController'

// ---------- SCHEMAS ------------
import signupSchema from './schemas/signup'
import loginSchema from './schemas/login'


// ----------- ROUTES -------------
export default (app: Router) => {
    app.use('/users', router)

    router.post(
        '/signup',
        SchemaValidation(signupSchema),  // Validate request body against the schema
        userController.signup
    )


    router.post(
        '/login',
        SchemaValidation(loginSchema), // Validate request body against the schema
        CheckCredentials,
    )
}
