import EventEmitter from "events";
import UserService from "../services/userService";

const userEvents = new EventEmitter();

userEvents.on("UserCreateOrganization", async (id_user, uuid_org) => {
    await UserService.createOrganization(id_user, uuid_org)
})



export default userEvents
