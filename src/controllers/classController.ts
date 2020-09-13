import { Request, Response } from 'express';
import { getTenantBoundClassModel } from '../models/class.model';

export class ClassController {

    public addNewClass(req: Request, res: Response) {
        let newRecord = new (getTenantBoundClassModel(req))(req.body);

        newRecord.save((err: any, response: any) => {
            if (err) {
                res.send(err);
            }
            res.json(response);
        });
    }

    public async updateClass(req: Request, res: Response) {
        const { query, data } = req.body;
        getTenantBoundClassModel(req).findOneAndUpdate(query, data, (err: any, response: any) => {
            if (err) {
                res.status(500).send(err);
            }
            res.status(200).json(response);
        });
    }

    public getAllClasses(req: Request, res: Response) {
        getTenantBoundClassModel(req).find({}, (err: any, response: any) => {
            if (err) {
                res.send(err);
            }
            res.json(response);
        });
    }

    public getAllClassesByDepartmentCode(req: Request, res: Response) {
        const { departmentCode } = req.params;
        getTenantBoundClassModel(req).find({ 'departmentCode': departmentCode }, (err: any, response: any) => {
            if (err) {
                res.send(err);
            }
            res.json(response);
        });
    }

}