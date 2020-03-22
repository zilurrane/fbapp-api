import { Request, Response } from 'express'
import { StudentModel } from '../models/Student.model';
import { UserModel } from '../models/user.model';
import { studentRoleValue } from '../helpers/constants';

export class UserController {

    public listAllUsers(req: Request, res: Response) {
        res.status(200).json([])
    }

    // TODO: Refactor this
    public async login(req: Request, res: Response) {
        const { userName, password } = req.body;
        const user: any = await UserModel.findOne({ userName }).exec();
        if (!user) {
            res.status(400).json({ error: { message: `We do not have any user with userName ${userName}.` } });
        } else {
            user.comparePassword(password, async function (err: any, isMatch: any) {
                if (isMatch && !err) {
                    const token = "TEST_TOKEN";
                    let roleSpecificUserData: any = {};
                    if (user.role === studentRoleValue) {
                        const roleSpecificUserDataResponse: any = await StudentModel.findOne({ user: user._id }).exec();
                        if (roleSpecificUserDataResponse) {
                            roleSpecificUserData = {
                                departmentCode: roleSpecificUserDataResponse.departmentCode,
                                classCode: roleSpecificUserDataResponse.classCode,
                                rollNumber: roleSpecificUserDataResponse.rollNumber
                            }
                        }
                    }
                    const userData: any = {
                        _id: user._id,
                        userName: user.userName,
                        isActive: user.isActive,
                        role: user.role
                    }
                    res.status(200).json({
                        message: 'Auth Passed.',
                        data: { ...userData, ...roleSpecificUserData },
                        token,
                    })
                } else {
                    return res.status(401).json({ message: 'UserName or Password is incorrect.' })
                }
            })
        }

    }

    public async createNewUser(req: Request, res: Response) {
        const userRecordToInsert = new UserModel(req.body);
        const userRecordResponse = await userRecordToInsert.save();
        if (userRecordResponse && userRecordResponse._id) {
            res.status(200).json(userRecordResponse);
        } else {
            res.status(500).json(userRecordResponse);
        }
    }
}