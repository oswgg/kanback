import { Router } from 'express'
import CheckUserIsLoggedMiddleware from '../../utils/middlewares/CheckUserIsLoggedMiddleware'
import projectController from './controller/projectController'
import CheckProjectRoleMiddleware from './middlewares/CheckProjectRoleMiddleware'
const router = Router()


export default (app: Router) => {
    app.use('/projects')

    router.post(
        '/new',
        CheckUserIsLoggedMiddleware,
        CheckProjectRoleMiddleware,
        projectController.createProject
    )
}
