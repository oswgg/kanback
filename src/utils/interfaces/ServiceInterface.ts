import { ErrorFactory } from "./ErrorInterfaces";


export default abstract class Service {
    static possibleError = new ErrorFactory(
        500,
        "Internal server error",
    )

    static findOne = (model: any, where: any) => model.findFirst({ where });

}
