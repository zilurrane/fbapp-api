import { Request, Response } from 'express';
import { ClassModel } from '../models/class.model';

export class ClassController {

    public addNewClass(req: Request, res: Response) {
        let newRecord = new ClassModel(req.body);

        newRecord.save((err, response) => {
            if (err) {
                res.send(err);
            }
            res.json(response);
        });
    }

    public getAllClasses(_req: Request, res: Response) {
        ClassModel.find({}, (err, response) => {
            if (err) {
                res.send(err);
            }
            res.json(response);
        });
    }

    public getAllClassesByDepartmentCode(req: Request, res: Response) {
        const { departmentCode } = req.params;
        ClassModel.find({ 'departmentCode': departmentCode }, (err, response) => {
            if (err) {
                res.send(err);
            }
            res.json(response);
        });
    }

}