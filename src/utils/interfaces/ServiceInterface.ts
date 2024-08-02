import { ErrorFactory } from "./ErrorInterfaces";


export default abstract class Service {

    protected possibleError: ErrorFactory

    constructor() {
        this.possibleError = new ErrorFactory(
            500,
            "Internal server error",
        )

    }

}
