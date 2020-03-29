import { Request, Response } from 'express';
import { TenantModel } from '../models/tenant.model';

export class TenantController {

    public getAllTenants(res: Response) {
        TenantModel.find({}, (err: any, response: any) => {
            if (err) {
                res.status(500).send(err);
            }
            res.status(200).json(response);
        });
    }

    public async createNewTenant(req: Request, res: Response) {
        const recordToInsert = new TenantModel(req.body);
        const response = await recordToInsert.save();
        if (response && response._id) {
            res.status(200).json(response);
        } else {
            res.status(500).json(response);
        }
    }
}