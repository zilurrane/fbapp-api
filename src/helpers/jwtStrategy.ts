import { Strategy, ExtractJwt } from 'passport-jwt'
import { UserModel } from '../models/user.model';
import { jwtSecretKey } from './constants';

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: jwtSecretKey
}

export const jwtStrategy = new Strategy(opts, (jwt_payload: any, done: any) => {
    const { tenantId, userName } = jwt_payload;
    UserModel.findOne({ userName, tenantId }, (err: any, user: any) => { // TODO: Implement interfaces
        if (err) {
            return done(err, false)
        }
        if (user) {
            done(null, user)
        } else {
            done(null, false)
        }
    })
})

export const generatePassword = (req: any) => {
    return req.body.userName;
}