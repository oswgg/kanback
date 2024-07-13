import { Router } from 'express'
const router = Router()

import userController from './controller/userController'

export default (app: Router) => {
    app.use('/users', router)

    router.get(
        "/auth",
        [

        ],
        userController.auth
    )


}
