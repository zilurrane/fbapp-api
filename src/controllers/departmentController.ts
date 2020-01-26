import { DepartmentModel } from '../models/department.model';
import { Request, Response } from 'express';

export class DepartmentController {

    public addNewDepartment(req: Request, res: Response) {
        let newRecord = new DepartmentModel(req.body);

        newRecord.save((err, response) => {
            if (err) {
                res.send(err);
            }
            res.json(response);
        });
    }

    public getAllDepartments(_req: Request, res: Response) {
        DepartmentModel.find({}, (err, response) => {
            if (err) {
                res.send(err);
            }
            res.json(response);
        });
    }

}