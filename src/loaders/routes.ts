import { Router } from 'express'
import users from '../modules/User/routes'
import organizations from '../modules/Organization/routes'
import orgInvitations from '../modules/OrgInivitation/routes'
import projects from '../modules/Project/routes'

export default () => {
    const router = Router()

    users(router)
    organizations(router)
    orgInvitations(router)
    projects(router)

    return router
}
