import { Request, Response } from 'express'
export default {
    signup: (req: Request, res: Response) => {
        return res.status(200).json({
            ok: true
        })
    },

    auth: (req: Request, res: Response) => {
        console.log("Autentificando ahora")
    },


}

