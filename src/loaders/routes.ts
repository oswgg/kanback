import { Router } from 'express'
import users from '../modules/User/routes'
import organizations from '../modules/Organization/routes'
import orgInvitations from '../modules/OrgInivitation/routes'

export default () => {
    const router = Router()

    users(router)
    organizations(router)
    orgInvitations(router)

    return router
}
