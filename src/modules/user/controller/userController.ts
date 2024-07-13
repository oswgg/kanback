import { Request, Response } from 'express'
export default {
    auth: (req: Request, res: Response) => {
        console.log("Autentificando ahora")
    }
}

