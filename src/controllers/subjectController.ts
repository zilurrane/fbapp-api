import { Request, Response } from 'express';
import { SubjectModel } from '../models/subject.model';
import { SubjectFacultyLinkModel } from '../models/subject-faculty-link.model';

export class SubjectController {

    public addNewSubject(req: Request, res: Response) {
        let newRecord = new SubjectModel(req.body);

        newRecord.save((err, response) => {
            if (err) {
                res.send(err);
            }
            res.json(response);
        });
    }

    public getAllSubjects(_req: Request, res: Response) {
        SubjectModel.find({}, (err, response) => {
            if (err) {
                res.send(err);
            }
            res.json(response);
        });
    }

    public getAllSubjectsByDepartmentCode(req: Request, res: Response) {
        const { departmentCode } = req.params;
        SubjectModel.find({ 'departmentCode': departmentCode }, (err, response) => {
            if (err) {
                res.send(err);
            }
            res.json(response);
        });
    }

    public getAllSubjectsByDepartmentCodeAndClassCode(req: Request, res: Response) {
        const { departmentCode, classCode } = req.params;
        SubjectModel.find({ 'departmentCode': departmentCode, 'classCode': classCode }, (err, response) => {
            if (err) {
                res.send(err);
            }
            res.json(response);
        });
    }

    public addUpdateSubjectFacultyLink(req: Request, res: Response) {
        const requestBody = req.body;
        SubjectFacultyLinkModel.insertMany(requestBody, (err, response) => {
            if (err) {
                res.send(err);
            }
            res.json(response);
        });
    }

    public getLinkedFacultiesBySubjectId(req: Request, res: Response) {
        const { subjectId } = req.params;
        SubjectFacultyLinkModel.find({ 'subjectId': subjectId }, (err, response) => {
            if (err) {
                res.send(err);
            }
            res.json(response);
        });
    }
}