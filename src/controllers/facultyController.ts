import { Request, Response } from 'express';
import { FacultyModel } from '../models/faculty.model';

export class FacultyController {

    public addNewFaculty(req: Request, res: Response) {
        let newRecord = new FacultyModel(req.body);

        newRecord.save((err, response) => {
            if (err) {
                res.send(err);
            }
            res.json(response);
        });
    }

    public getAllFaculties(_req: Request, res: Response) {
        FacultyModel.find({}, (err, response) => {
            if (err) {
                res.send(err);
            }
            res.json(response);
        });
    }

    public getAllFacultiesByDepartmentCode(req: Request, res: Response) {
        const { departmentCode } = req.params;
        FacultyModel.find({ 'departmentCode': departmentCode }, (err, response) => {
            if (err) {
                res.send(err);
            }
            res.json(response);
        });
    }

    public getAllFacultiesByDepartmentCodeAndClassCode(req: Request, res: Response) {
        const { departmentCode, classCode } = req.params;
        FacultyModel.find({ 'departmentCode': departmentCode, 'classCode': classCode }, (err, response) => {
            if (err) {
                res.send(err);
            }
            res.json(response);
        });
    }

}