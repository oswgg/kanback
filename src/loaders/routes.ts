import { Router } from 'express'
import users from '../modules/user/routes'
import organizations from '../modules/organization/routes'

export default () => {
    const router = Router()

    users(router)
    organizations(router)

    return router
}
