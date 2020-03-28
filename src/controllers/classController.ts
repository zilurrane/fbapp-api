import { Request, Response } from 'express';
import { getTenantBoundClassModel } from '../models/class.model';
import { tenantId } from '../helpers/constants';

export class ClassController {

    public addNewClass(req: Request, res: Response) {
        let newRecord = new (getTenantBoundClassModel(tenantId))(req.body);

        newRecord.save((err: any, response: any) => {
            if (err) {
                res.send(err);
            }
            res.json(response);
        });
    }

    public getAllClasses(_req: Request, res: Response) {
        getTenantBoundClassModel(tenantId).find({}, (err: any, response: any) => {
            if (err) {
                res.send(err);
            }
            res.json(response);
        });
    }

    public getAllClassesByDepartmentCode(req: Request, res: Response) {
        const { departmentCode } = req.params;
        getTenantBoundClassModel(tenantId).find({ 'departmentCode': departmentCode }, (err: any, response: any) => {
            if (err) {
                res.send(err);
            }
            res.json(response);
        });
    }

}