import { Request, Response } from 'express'
import { getTenantBoundUserModel } from '../models/user.model';
import { tenantId } from '../helpers/constants';

export class UserController {

    public listAllUsers(res: Response) {
        res.status(200).json([])
    }

    public async createNewUser(req: Request, res: Response) {
        const userRecordToInsert = new (getTenantBoundUserModel(req.user))(req.body);
        const userRecordResponse = await userRecordToInsert.save();
        if (userRecordResponse && userRecordResponse._id) {
            res.status(200).json(userRecordResponse);
        } else {
            res.status(500).json(userRecordResponse);
        }
    }
}