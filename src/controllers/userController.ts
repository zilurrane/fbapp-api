import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { getTenantBoundUserModel, UserModel } from '../models/user.model';
import { studentRoleValue, tenantId, jwtSecretKey, jwtExpiryTime } from '../helpers/constants';
import { getTenantBoundStudentModel } from '../models/Student.model';

export class UserController {

    public listAllUsers(req: Request, res: Response) {
        res.status(200).json([])
    }

    // TODO: Refactor this
    public async login(req: Request, res: Response) {
        const { userName, password } = req.body;
        const user: any = await UserModel.findOne({ userName }).exec();
        if (!user) {
            res.status(400).json({ error: { message: `We do not have any user with username ${userName}.` } });
        } else {
            user.comparePassword(password, async function (err: any, isMatch: any) {
                if (isMatch && !err) {
                    let roleSpecificUserData: any = {};
                    if (user.role === studentRoleValue) {
                        const roleSpecificUserDataResponse: any = await getTenantBoundStudentModel(user.tenantId).findOne({ user: user._id }).exec();
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
                        role: user.role,
                        tenantId: user.tenantId
                    }
                    const token = jwt.sign(userData, jwtSecretKey, {
                        expiresIn: jwtExpiryTime
                    });
                    res.status(200).json({
                        message: 'Auth Passed.',
                        data: { ...userData, ...roleSpecificUserData },
                        token,
                    })
                } else {
                    return res.status(401).json({ message: 'Username or Password is incorrect.' })
                }
            })
        }

    }

    public async createNewUser(req: Request, res: Response) {
        const userRecordToInsert = new (getTenantBoundUserModel(tenantId))(req.body);
        const userRecordResponse = await userRecordToInsert.save();
        if (userRecordResponse && userRecordResponse._id) {
            res.status(200).json(userRecordResponse);
        } else {
            res.status(500).json(userRecordResponse);
        }
    }
}