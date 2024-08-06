import { Router } from 'express'
const router = Router()

// ----------- MIDDLEWARES ---------
import CheckUserIsLoggedMiddleware from '../../utils/middlewares/CheckUserIsLoggedMiddleware'
import SchemaValidation from '../../utils/middlewares/SchemaValidation'

// ----------- CONTROLLER ----------
import orgInvController from './controller/orgInvController'

// ---------- SCHEMAS ------------
import inviteSchema from './schemas/invitationSchema'


export default (app: Router) => {

    app.use('/org-invitation', router)


    router.post(
        '/invite',
        CheckUserIsLoggedMiddleware,
        SchemaValidation(inviteSchema),
        orgInvController.createInvitation
    )

    router.get(
        '/join-us/:org_name/:invitation_code',
        CheckUserIsLoggedMiddleware,
        orgInvController.joinOrganization
    )



    return router
}

