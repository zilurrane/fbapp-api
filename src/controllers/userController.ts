import { Request, Response } from 'express'
import { StudentModel } from '../models/Student.model';

export class UserController {

    public listAllUsers(req: Request, res: Response) {
        res.status(200).json([])
    }

    // TODO: Refactor this
    public login(req: Request, res: Response) {

        const { userName, password } = req.body;
        StudentModel.findOne({ userName, password })
            .then((response) => {
                res.send(response);
            })
            .catch((err) => {
                res.status(500).send(err);
            });
    }

    public createNewUser(req: Request, res: Response) {
        res.status(200).json({})
    }
}