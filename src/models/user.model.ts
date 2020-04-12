import * as mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { jwtSecretKey, jwtExpiryTime } from '../helpers/constants';
const mongoTenant = require('mongo-tenant');

const Schema = mongoose.Schema;

export const UserSchema = new Schema({
    userName: {
        type: String,
        required: 'Username is required',
        unique: true
    },
    password: {
        type: String,
        required: 'Password is required',
    },
    role: {
        type: Number,
        required: 'Role is required'
    },
    email: {
        type: String
    },
    isActive: {
        type: Boolean,
        default: false
    },
    verificationToken: {
        type: String
    },
    createdDate: {
        type: Date,
        default: Date.now
    }
});

UserSchema.pre('save', function (next) {
    let user: any = this
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err)
            }
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) {
                    return next(err)
                }
                user.password = hash
                next()
            })
        })
    }
    else {
        return next()
    }
})

UserSchema.methods.comparePassword = function (pw: string, cb: any) {
    bcrypt.compare(pw, this.password, (err, isMatch) => {
        if (err) {
            return cb(err)
        }
        cb(null, isMatch)
    })
}

UserSchema.methods.generateVerificationToken = async function () {
    const payload = {
        userId: this._id,
        token: crypto.randomBytes(20).toString('hex')
    };
    const token = jwt.sign(payload, jwtSecretKey);
    this.verificationToken = payload.token;
    await this.save();
    return token
};

UserSchema.plugin(mongoTenant);
export const UserModel: any = mongoose.model('User', UserSchema);
export const getTenantBoundUserModel = (req: any) => UserModel.byTenant(req.user.tenantId == '0' ? req.header('TenantId') : req.user.tenantId);
