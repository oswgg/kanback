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
import addMemberPayload from './schemas/addMemberPayload'

const sysAdmin = $Enums.OrgRole.admin

export default (app: Router) => {
    app.use('/project', router)

    router.get(
        "/",
        CheckUserIsLoggedMiddleware,
        projectController.getAllProjects
    )

    router.get(
        '/detail/:project_code_id',
        CheckUserIsLoggedMiddleware,
        projectController.getDetails
    )

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

    router.post(
        '/member/add',
        CheckUserIsLoggedMiddleware,
        CheckUserRoleMiddleware([sysAdmin], 'add member'),
        SchemaValidation(addMemberPayload),
        projectController.addMember
    )

    return router
}
