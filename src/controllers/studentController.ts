import { Request, Response } from 'express';
import { StudentModel } from '../models/Student.model';

export class StudentController {

    public generateStudents(req: Request, res: Response) {
        const { departmentCode, classCode, startingRollNumber, endingRollNumber } = req.body;

        const getStudentUserName = (departmentCode: string, classCode: string, rollNumber: number) => `${departmentCode}${classCode}${rollNumber}`;

        let newStudents: any[] = [];
        for (let currentStudentRollNumber: number = startingRollNumber; currentStudentRollNumber <= endingRollNumber; currentStudentRollNumber++) {
            newStudents.push({
                departmentCode,
                classCode,
                rollNumber: currentStudentRollNumber,
                userName: getStudentUserName(departmentCode, classCode, currentStudentRollNumber),
                password: getStudentUserName(departmentCode, classCode, currentStudentRollNumber) // TODO: Encrypted password
            });
        }

        StudentModel.insertMany(newStudents, (err: any, response: any) => {
            if (err) {
                res.send(err);
            }
            res.json(response);
        });
    }
}