import { Request, Response } from 'express';
import { getTenantBoundFacultyModel } from '../models/faculty.model';
import { tenantId } from '../helpers/constants';

export class FacultyController {

    public addNewFaculty(req: Request, res: Response) {
        let newRecord = new (getTenantBoundFacultyModel(req.user))(req.body);

        newRecord.save((err: any, response: any) => {
            if (err) {
                res.send(err);
            }
            res.json(response);
        });
    }

    public getAllFaculties(req: Request, res: Response) {
        getTenantBoundFacultyModel(req.user).find({}, (err: any, response: any) => {
            if (err) {
                res.send(err);
            }
            res.json(response);
        });
    }

    public getAllFacultiesByDepartmentCode(req: Request, res: Response) {
        const { departmentCode } = req.params;
        getTenantBoundFacultyModel(req.user).find({ 'departmentCode': departmentCode }, (err: any, response: any) => {
            if (err) {
                res.send(err);
            }
            res.json(response);
        });
    }

    public getAllFacultiesByDepartmentCodeAndClassCode(req: Request, res: Response) {
        const { departmentCode, classCode } = req.params;
        getTenantBoundFacultyModel(req.user).find({ 'departmentCode': departmentCode, 'classCode': classCode }, (err: any, response: any) => {
            if (err) {
                res.send(err);
            }
            res.json(response);
        });
    }

}