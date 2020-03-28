import express from 'express';
import * as bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import morgan from 'morgan';
import passport from 'passport'
import graphQLServer from './graphql';
import { HealthCheckRoutes } from './routes/healthCheckRoutes';
import { UserRoutes } from './routes/userRoutes';
import { DepartmentRoutes } from './routes/departmentRoutes';
import { ClassRoutes } from './routes/classRoutes';
import { SubjectRoutes } from './routes/subjectRoutes';
import { FacultyRoutes } from './routes/facultyRoutes';
import { StudentRoutes } from './routes/studentRoutes';
import { FeedbackRoutes } from './routes/feedbackRoutes';
import { jwtStrategy } from './helpers/jwtStrategy';

class App {

    public app: express.Application;
    public healthCheckRoutes: HealthCheckRoutes = new HealthCheckRoutes();
    public userRoutes: UserRoutes = new UserRoutes();
    public departmentRoutes: DepartmentRoutes = new DepartmentRoutes();
    public classRoutes: ClassRoutes = new ClassRoutes();
    public subjectRoutes: SubjectRoutes = new SubjectRoutes();
    public facultyRoutes: FacultyRoutes = new FacultyRoutes();
    public studentRoutes: StudentRoutes = new StudentRoutes();
    public feedbackRoutes: FeedbackRoutes = new FeedbackRoutes();
    public mongoUrl: string = <string>process.env.MONGO_CON_STRING;

    constructor() {
        this.app = express();

        graphQLServer.applyMiddleware({ app: this.app });

        this.config();
        this.mongoSetup();

        this.app.use('/api/users', this.userRoutes.getAllRoutes());
        this.app.use('/api/departments', this.getPassportAuthenticatorMiddleware(), this.departmentRoutes.getAllRoutes());
        this.app.use('/api/classes', this.getPassportAuthenticatorMiddleware(), this.classRoutes.getAllRoutes());
        this.app.use('/api/subjects', this.getPassportAuthenticatorMiddleware(), this.subjectRoutes.getAllRoutes());
        this.app.use('/api/faculties', this.getPassportAuthenticatorMiddleware(), this.facultyRoutes.getAllRoutes());
        this.app.use('/api/students', this.getPassportAuthenticatorMiddleware(), this.studentRoutes.getAllRoutes());
        this.app.use('/api/feedbacks', this.getPassportAuthenticatorMiddleware(), this.feedbackRoutes.getAllRoutes());
        this.app.use('/api/healthcheck', this.healthCheckRoutes.getAllRoutes());
    }

    private config(): void {
        this.app.use(cors());
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(morgan('combined'));
        passport.use(jwtStrategy);
    }

    private mongoSetup(): void {
        mongoose.Promise = global.Promise;
        mongoose.connect(this.mongoUrl).then((res: any) => {
            console.log('--------------------------------------------------------------');
            console.log('MongoDB connected successfully!!!');
            console.log('--------------------------------------------------------------');
        });
    }

    private getPassportAuthenticatorMiddleware() {
        return passport.authenticate('jwt', { session: false });
    }
}

export default new App().app;