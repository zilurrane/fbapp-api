import { Request, Response } from 'express';
import { getTenantBoundClassModel } from '../models/class.model';

export class ClassController {

    public addNewClass(req: Request, res: Response) {
        let newRecord = new (getTenantBoundClassModel(req.user))(req.body);

        newRecord.save((err: any, response: any) => {
            if (err) {
                res.send(err);
            }
            res.json(response);
        });
    }

    public getAllClasses(req: Request, res: Response) {
        getTenantBoundClassModel(req.user).find({}, (err: any, response: any) => {
            if (err) {
                res.send(err);
            }
            res.json(response);
        });
    }

    public getAllClassesByDepartmentCode(req: Request, res: Response) {
        const { departmentCode } = req.params;
        getTenantBoundClassModel(req.user).find({ 'departmentCode': departmentCode }, (err: any, response: any) => {
            if (err) {
                res.send(err);
            }
            res.json(response);
        });
    }

}