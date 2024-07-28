import EventEmitter from "events";
import UserService from "../../User/services/userService";

const orgInvitationEvents = new EventEmitter()

orgInvitationEvents.on('InvitationClaimed', async ([idUserWhoClaim, uuidOrgToJoin]: [idUserWhoClaim: number, uuidOrgToJoin: string]) => {
    return await UserService.joinToOrganization(idUserWhoClaim, uuidOrgToJoin)
})


export default orgInvitationEvents
