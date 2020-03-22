import { Request, Response } from 'express'
import { StudentModel } from '../models/Student.model';
import { UserModel } from '../models/user.model';

export class UserController {

    public listAllUsers(req: Request, res: Response) {
        res.status(200).json([])
    }

    // TODO: Refactor this
    public async login(req: Request, res: Response) {
        const { userName, password } = req.body;
        const user: any = await UserModel.findOne({ userName }).exec();
        if (!user) {
            res.status(400).json({ error: { message: `We do not have any user with userName ${userName}.` } });
        } else {
            user.comparePassword(password, function (err: any, isMatch: any) {
                if (isMatch && !err) {
                    const token = "TEST_TOKEN";
                    res.status(200).json({
                        message: 'Auth Passed.',
                        data: user,
                        token,
                    })
                } else {
                    return res.status(401).json({ message: 'UserName or Password is incorrect.' })
                }
            })
        }

    }

    public createNewUser(req: Request, res: Response) {
        res.status(200).json({})
    }
}