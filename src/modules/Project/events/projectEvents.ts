import EventEmitter from "events";
import ProjectService from "../services/projectService";
import { $Enums } from "@prisma/client";

const projectEvents = new EventEmitter()

projectEvents.on("ProjectCreated", async ([creatorUserID, projectCodeID]: [creatorUserID: number, projectCodeID: string]) => {
    return await ProjectService.addMember(creatorUserID, projectCodeID, $Enums.ProjectMemberTypes.admin)
})


export default projectEvents
