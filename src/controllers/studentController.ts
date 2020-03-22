import { Request, Response } from 'express';
import { StudentModel } from '../models/Student.model';
import { UserModel } from '../models/user.model';
import { studentRoleValue } from '../helpers/constants';

export class StudentController {

    public async generateStudents(req: Request, res: Response) {
        const { departmentCode, classCode, startingRollNumber, endingRollNumber } = req.body;

        const getStudentUserName = (departmentCode: string, classCode: string, rollNumber: number) => `${departmentCode}${classCode}${rollNumber}`;

        let newStudents: any[] = [];
        for (let currentStudentRollNumber: number = startingRollNumber; currentStudentRollNumber <= endingRollNumber; currentStudentRollNumber++) {
            const userName = getStudentUserName(departmentCode, classCode, currentStudentRollNumber);
            const userRecordToInsert = new UserModel({
                userName,
                password: userName,
                role: studentRoleValue,
            });
            const userRecord = await userRecordToInsert.save();
            newStudents.push({
                user: userRecord._id,
                departmentCode,
                classCode,
                rollNumber: currentStudentRollNumber,
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