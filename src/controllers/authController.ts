import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { UserModel } from '../models/user.model';
import { studentRoleValue, jwtSecretKey, jwtExpiryTime } from '../helpers/constants';
import { getTenantBoundStudentModel } from '../models/Student.model';

export class AuthController {

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
                        const roleSpecificUserDataResponse: any = await getTenantBoundStudentModel({ user }).findOne({ user: user._id }).exec();
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

    public async confirmAccount(req: Request, res: Response) {
        try {
            const { token } = req.body;
            if (!token) res.status(400).send({ error: { message: 'Account verification link is not valid!' } });
            const decoded: any = jwt.verify(token, jwtSecretKey);
            if (!decoded || !decoded.userId || !decoded.token) res.status(400).send({ error: { message: 'Account verification link is not valid!' } });
            const user: any = await UserModel.findOne({ _id: decoded.userId, verificationToken: decoded.token }).exec();
            if (!user) {
                res.status(400).send({ error: { message: 'Account confirmation link is not valid!' } });
            } else if (user.isActive) {
                res.status(200).send({ data: { message: 'Your account is already verified! Please login to start using FbApp.' } });
            }
            user.isActive = true;
            // user.verificationToken = '';
            await user.save();
            res.status(200).send({ data: { message: 'Your account has been verified successfully! Please login to start using FbApp.' } });
        }
        catch {
            res.status(400).send({ error: { message: 'Account verification link is not valid!' } });
        }
    }
}