import { Router } from 'express'
import CheckUserIsLoggedMiddleware from '../../utils/middlewares/CheckUserIsLoggedMiddleware'
import projectController from './controller/projectController'
import CheckProjectPermMiddleware from './middlewares/CheckProjectPermsMiddleware'
const router = Router()


export default (app: Router) => {
    app.use('/projects')

    router.post(
        '/new',
        CheckUserIsLoggedMiddleware,
        CheckProjectPermMiddleware,
        projectController.createProject
    )
}
