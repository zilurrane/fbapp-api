import { Request, Response } from 'express'
import { getTenantBoundUserModel } from '../models/user.model';
import { generatePassword } from '../helpers/jwtStrategy';
import { teacherRoleValue } from '../helpers/constants';
import { sendAccountConfirmationEmail } from '../helpers/email-helper';

export class UserController {

    public listAllAccessibleUsers(req: any, res: Response) {
        getTenantBoundUserModel(req).find({ role: { $lt: teacherRoleValue, $gt: req.user.role } }, (err: any, response: any) => {
            if (err) {
                res.status(500).send(err);
            }
            res.status(200).json(response);
        });
    }

    public listAllUsers(req: Request, res: Response) {
        getTenantBoundUserModel(req).find({}, (err: any, response: any) => {
            if (err) {
                res.status(500).send(err);
            }
            res.status(200).json(response);
        });
    }

    public async createNewUser(req: Request, res: Response) {
        if (!req.body['password']) req.body['password'] = generatePassword(req);
        const userRecordToInsert = new (getTenantBoundUserModel(req))(req.body);
        let userRecordResponse = await userRecordToInsert.save();
        if (userRecordResponse && userRecordResponse._id) {
            const token = await userRecordResponse.generateVerificationToken();
            await sendAccountConfirmationEmail(userRecordResponse, token);
            res.status(200).json(userRecordResponse);
        } else {
            res.status(500).json(userRecordResponse);
        }
    }

    public async updateUser(req: Request, res: Response) {
        const { query, data } = req.body;
        getTenantBoundUserModel(req).findOneAndUpdate(query, data, (err: any, response: any) => {
            if (err) {
                res.status(500).send(err);
            }
            res.status(200).json(response);
        });
    }
}