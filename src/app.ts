import express from "express";
import * as bodyParser from "body-parser";
import cors from 'cors';
import mongoose from "mongoose";
import graphQLServer from './graphql';
import { HealthCheckRoutes } from "./routes/healthCheckRoutes";
import { UserRoutes } from './routes/userRoutes';
import { DepartmentRoutes } from "./routes/departmentRoutes";
import { ClassRoutes } from "./routes/classRoutes";
import { SubjectRoutes } from "./routes/subjectRoutes";
import { FacultyRoutes } from "./routes/facultyRoutes";
import { StudentRoutes } from "./routes/studentRoutes";
import { FeedbackRoutes } from "./routes/feedbackRoutes";

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
        this.app.use('/api/departments', this.departmentRoutes.getAllRoutes());
        this.app.use('/api/classes', this.classRoutes.getAllRoutes());
        this.app.use('/api/subjects', this.subjectRoutes.getAllRoutes());
        this.app.use('/api/faculties', this.facultyRoutes.getAllRoutes());
        this.app.use('/api/students', this.studentRoutes.getAllRoutes());
        this.app.use('/api/feedbacks', this.healthCheckRoutes.getAllRoutes());
        this.app.use('/api/healthcheck', this.healthCheckRoutes.getAllRoutes());
    }

    private config(): void {
        this.app.use(cors());
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }

    private mongoSetup(): void {
        mongoose.Promise = global.Promise;
        mongoose.connect(this.mongoUrl).then((res: any) => {
            console.log("--------------------------------------------------------------");
            console.log("MongoDB connected successfully!!!");
            console.log("--------------------------------------------------------------");
        });
    }
}

export default new App().app;