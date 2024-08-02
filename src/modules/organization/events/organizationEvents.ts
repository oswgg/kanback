import EventEmitter from "events";
import UserServiceClass from "../../User/services/userService";

const UserService = new UserServiceClass()
const organizationEvents = new EventEmitter()


organizationEvents.on('OrganizationCreated', ([userCreatorID, createdOrgUUID]: [userCreatorID: number, createdOrgUUID: string]) => {
    UserService.createOrganization(userCreatorID, createdOrgUUID)
})


export default organizationEvents
