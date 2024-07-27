import { Router } from 'express'
import users from '../modules/User/routes'
import organizations from '../modules/Organization/routes'

export default () => {
    const router = Router()

    users(router)
    organizations(router)

    return router
}
