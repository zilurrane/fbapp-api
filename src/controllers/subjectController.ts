import { Request, Response } from 'express';
import { getTenantBoundSubjectModel } from '../models/subject.model';
import { getTenantBoundSubjectFacultyLinkModel } from '../models/subject-faculty-link.model';
import { tenantId } from '../helpers/constants';

export class SubjectController {

    public addNewSubject(req: Request, res: Response) {
        let newRecord = new (getTenantBoundSubjectModel(tenantId))(req.body);

        newRecord.save((err: any, response: any) => {
            if (err) {
                res.send(err);
            }
            res.json(response);
        });
    }

    public getAllSubjects(_req: Request, res: Response) {
        getTenantBoundSubjectModel(tenantId).find({}, (err: any, response: any) => {
            if (err) {
                res.send(err);
            }
            res.json(response);
        });
    }

    public getAllSubjectsByDepartmentCode(req: Request, res: Response) {
        const { departmentCode } = req.params;
        getTenantBoundSubjectModel(tenantId).find({ 'departmentCode': departmentCode }, (err: any, response: any) => {
            if (err) {
                res.send(err);
            }
            res.json(response);
        });
    }

    public getAllSubjectsByDepartmentCodeAndClassCode(req: Request, res: Response) {
        const { departmentCode, classCode } = req.params;
        getTenantBoundSubjectModel(tenantId).find({ 'departmentCode': departmentCode, 'classCode': classCode }, (err: any, response: any) => {
            if (err) {
                res.send(err);
            }
            res.json(response);
        });
    }

    public addUpdateSubjectFacultyLink(req: Request, res: Response) {
        const requestBody = req.body;
        getTenantBoundSubjectFacultyLinkModel(tenantId).insertMany(requestBody, (err: any, response: any) => {
            if (err) {
                res.send(err);
            }
            res.json(response);
        });
    }

    public getLinkedFacultiesBySubjectId(req: Request, res: Response) {
        const { subjectId } = req.params;
        getTenantBoundSubjectFacultyLinkModel(tenantId).find({ 'subject': subjectId })
            .populate('faculty')
            .then((response: any) => {
                res.send(response);
            })
            .catch((err: any) => {
                res.status(500).send(err);
            });
    }
}