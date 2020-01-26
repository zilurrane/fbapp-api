import { Request, Response } from 'express'

export class UserController {

    public listAllUsers(req: Request, res: Response) {
        res.status(200).json([])
    }

    public login(req: Request, res: Response) {
        res.status(200).json({})
    }

    public createNewUser(req: Request, res: Response) {
        res.status(200).json({})
    }
}