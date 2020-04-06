import { Request, Response } from 'express';
import { getTenantBoundStudentModel } from '../models/Student.model';
import { getTenantBoundUserModel } from '../models/user.model';
import { studentRoleValue, tenantId } from '../helpers/constants';

export class StudentController {

    public async generateStudents(req: Request, res: Response) {
        const { departmentCode, classCode, startingRollNumber, endingRollNumber } = req.body;

        const getStudentUserName = (departmentCode: string, classCode: string, rollNumber: number) => `${departmentCode}${classCode}${rollNumber}`;

        let newStudents: any[] = [];
        for (let currentStudentRollNumber: number = startingRollNumber; currentStudentRollNumber <= endingRollNumber; currentStudentRollNumber++) {
            const userName = getStudentUserName(departmentCode, classCode, currentStudentRollNumber);
            const userRecordToInsert = new (getTenantBoundUserModel(req))({
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

        getTenantBoundStudentModel(req).insertMany(newStudents, (err: any, response: any) => {
            if (err) {
                res.send(err);
            }
            res.json(response);
        });
    }
}