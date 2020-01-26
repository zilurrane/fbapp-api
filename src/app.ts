import express from "express";
import * as bodyParser from "body-parser";
import { HealthCheckRoutes } from "./routes/healthCheckRoutes";
import { UserRoutes } from './routes/userRoutes';
import cors from 'cors';

class App {

    public app: express.Application;
    public healthCheckRoutes: HealthCheckRoutes = new HealthCheckRoutes();
    public userRoutes: UserRoutes = new UserRoutes();
    public mongoUrl: string = <string>process.env.MONGO_CON_STRING;

    constructor() {
        this.app = express();
        this.config();

        this.app.use('/api/users', this.userRoutes.getAllRoutes());
        this.app.use('/api/healthcheck', this.healthCheckRoutes.getAllRoutes());
    }

    private config(): void {
        this.app.use(cors());
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }
}

export default new App().app;