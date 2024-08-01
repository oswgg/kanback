import { Router } from 'express'
import { $Enums } from '@prisma/client'
const router = Router()

// ----- CONTROLLER
import projectController from './controller/projectController'

// ----- MIDDLEWARES
import CheckUserRoleMiddleware from '../../utils/middlewares/CheckUserRoleMiddleware'
import CheckUserIsLoggedMiddleware from '../../utils/middlewares/CheckUserIsLoggedMiddleware'
import SchemaValidation from '../../utils/middlewares/SchemaValidation'

// ----- SCHEMAS
import createPayload from './schemas/createProjectPayload'

const sysAdmin = $Enums.OrgRole.admin

export default (app: Router) => {
    app.use('/projects', router)

    router.post(
        '/new',
        CheckUserIsLoggedMiddleware,
        CheckUserRoleMiddleware([sysAdmin], 'create new project'),
        SchemaValidation(createPayload),
        projectController.createProject
    )

    router.put(
        '/update/:project_code_id',
        CheckUserIsLoggedMiddleware,
        projectController.updateProject
    )

    return router
}
