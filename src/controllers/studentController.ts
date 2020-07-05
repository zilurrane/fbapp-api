import { Request, Response } from 'express';
import { getTenantBoundStudentModel } from '../models/student.model';
import { getTenantBoundUserModel } from '../models/user.model';
import { studentRoleValue } from '../helpers/constants';
import { TenantModel } from '../models/tenant.model';

export class StudentController {

    public async generateStudents(req: Request, res: Response) {
        const { departmentCode, classCode, startingRollNumber, endingRollNumber } = req.body;

        const getStudentUserName = (tenantCode: string, departmentCode: string, classCode: string, rollNumber: number) => `${tenantCode}${departmentCode}${classCode}${rollNumber}`;

        const getTenantId = (req: any) => req.user.tenantId == '0' ? req.header('TenantId') : req.user.tenantId;

        let newStudents: any[] = [];
        const tenantRecord = await TenantModel.findById(getTenantId(req));
        for (let currentStudentRollNumber: number = startingRollNumber; currentStudentRollNumber <= endingRollNumber; currentStudentRollNumber++) {
            const userName = getStudentUserName(tenantRecord.code, departmentCode, classCode, currentStudentRollNumber);
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