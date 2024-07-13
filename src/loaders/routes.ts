import { Router } from 'express'
import users from '../modules/user/routes'

export default () => {
    const router = Router()

    users(router)

    return router
}
