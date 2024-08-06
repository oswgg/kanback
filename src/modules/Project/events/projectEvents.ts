import { $Enums } from "@prisma/client";
import EventEmitter from "events";
import ProjectService from '../services/projectService'


const projectEvents = new EventEmitter()

projectEvents.on("ProjectCreated", async ([creatorUserID, projectCodeID]: [creatorUserID: number, projectCodeID: string]) => {
    return await new ProjectService().addMember(creatorUserID, projectCodeID, $Enums.ProjectMemberTypes.admin)
})


export default projectEvents
