import { Router } from 'express'
const router = Router()

// ----------- MIDDLEWARES ---------
import AuthorizationMiddleware from '../../utils/middlewares/AuthorizationMiddleware'
import SchemaValidation from '../../utils/middlewares/SchemaValidation'

// ----------- CONTROLLER ----------
import organizationController from './controller/organizationController'

// ---------- SCHEMAS ------------
import createSchema from './schemas/createOrganization'
import inviteSchema from './schemas/invitationSchema'


export default (app: Router) => {

    app.use('/organization', router)


    router.post(
        '/create',
        AuthorizationMiddleware,
        SchemaValidation(createSchema),
        organizationController.create
    )

    router.post(
        '/invite',
        AuthorizationMiddleware,
        SchemaValidation(inviteSchema),
        organizationController.createInvitation
    )

    return router
}
