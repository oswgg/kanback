import EventEmitter from "events";
import UserServiceClass from "../../User/services/userService";

const UserService = new UserServiceClass()
const orgInvitationEvents = new EventEmitter()

orgInvitationEvents.on('InvitationClaimed', async ([idUserWhoClaim, uuidOrgToJoin]: [idUserWhoClaim: number, uuidOrgToJoin: string]) => {
    return await UserService.joinToOrganization(idUserWhoClaim, uuidOrgToJoin)
})


export default orgInvitationEvents
