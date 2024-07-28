import { Router } from 'express'
const router = Router()

// ----------- MIDDLEWARES ---------
import AuthorizationMiddleware from '../../utils/middlewares/AuthorizationMiddleware'
import SchemaValidation from '../../utils/middlewares/SchemaValidation'

// ----------- CONTROLLER ----------
import orgInvController from './controller/orgInvController'

// ---------- SCHEMAS ------------
import inviteSchema from './schemas/invitationSchema'


export default (app: Router) => {

    app.use('/org-invitation', router)


    router.post(
        '/invite',
        AuthorizationMiddleware,
        SchemaValidation(inviteSchema),
        orgInvController.createInvitation
    )

    router.get(
        '/join-us/:org_name/:invitation_code',
        AuthorizationMiddleware,
        orgInvController.joinOrganization
    )



    return router
}

