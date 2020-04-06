import { getTenantBoundDepartmentModel } from '../models/department.model';
import { Request, Response } from 'express';
import { tenantId } from '../helpers/constants';

export class DepartmentController {

    public addNewDepartment(req: Request, res: Response) {
        let newRecord = new (getTenantBoundDepartmentModel(req))(req.body);

        newRecord.save((err: any, response: any) => {
            if (err) {
                res.send(err);
            }
            res.json(response);
        });
    }

    public getAllDepartments(req: Request, res: Response) {
        getTenantBoundDepartmentModel(req).find({}, (err: any, response: any) => {
            if (err) {
                res.send(err);
            }
            res.json(response);
        });
    }

}