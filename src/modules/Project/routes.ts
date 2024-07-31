import { Router } from 'express'
import CheckUserIsLoggedMiddleware from '../../utils/middlewares/CheckUserIsLoggedMiddleware'
import projectController from './controller/projectController'
import CheckUserRoleMiddleware from '../../utils/middlewares/CheckUserRoleMiddleware'
import { $Enums } from '@prisma/client'
const router = Router()

const sysAdmin = $Enums.OrgRole.admin

export default (app: Router) => {
    app.use('/projects', router)

    router.post(
        '/new',
        CheckUserIsLoggedMiddleware,
        CheckUserRoleMiddleware([sysAdmin], 'create new project'),
        projectController.createProject
    )

    router.put(
        '/update/:project_code_id',
        CheckUserIsLoggedMiddleware,
        projectController.updateProject
    )

    return router
}
