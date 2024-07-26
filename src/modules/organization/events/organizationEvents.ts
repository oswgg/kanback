import EventEmitter from "events";
import UserService from "../../user/services/userService";

const organizationEvents = new EventEmitter()


organizationEvents.on('OrganizationCreated', ([userCreatorID, createdOrgUUID]: [userCreatorID: number, createdOrgUUID: string]) => {
    UserService.createOrganization(userCreatorID, createdOrgUUID)
})

export default organizationEvents
