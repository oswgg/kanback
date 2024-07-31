import { Request, Response, NextFunction } from 'express'

export default {
    createProject: async (req: Request, res: Response, next: NextFunction) => {
        try {

            return res.status(200).json({
                ok: true
            })
        } catch (err: any) {

        }
    },


    updateProject: async (req: Request, res: Response, next: NextFunction) => {
        try {

        } catch (err: any) {

        }
    },
}
