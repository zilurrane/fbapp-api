import * as mongoose from 'mongoose';
import bcrypt from 'bcrypt'

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
        type: String,
        unique: true
    },
    isActive: {
        type: Boolean,
        default: true
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

export const UserModel = mongoose.model('User', UserSchema);
