import { Router } from 'express'
const router = Router()

// ----------- MIDDLEWARES ---------
import CheckUserIsLoggedMiddleware from '../../utils/middlewares/CheckUserIsLoggedMiddleware'
import SchemaValidation from '../../utils/middlewares/SchemaValidation'

// ----------- CONTROLLER ----------
import organizationController from './controller/organizationController'

// ---------- SCHEMAS ------------
import createSchema from './schemas/createOrganization'


export default (app: Router) => {

    app.use('/organization', router)

    router.post(
        '/create',
        CheckUserIsLoggedMiddleware,
        SchemaValidation(createSchema),
        organizationController.create
    )
    return router
}
