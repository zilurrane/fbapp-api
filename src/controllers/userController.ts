import { Request, Response } from 'express'
import { getTenantBoundUserModel } from '../models/user.model';

export class UserController {

    public listAllUsers(req: Request, res: Response) {
        getTenantBoundUserModel(req).find({}, (err: any, response: any) => {
            if (err) {
                res.status(500).send(err);
            }
            res.status(200).json(response);
        });
    }

    public async createNewUser(req: Request, res: Response) {
        const userRecordToInsert = new (getTenantBoundUserModel(req))(req.body);
        const userRecordResponse = await userRecordToInsert.save();
        if (userRecordResponse && userRecordResponse._id) {
            res.status(200).json(userRecordResponse);
        } else {
            res.status(500).json(userRecordResponse);
        }
    }
}