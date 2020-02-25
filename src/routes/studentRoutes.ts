import { Router } from "express";
import { StudentController } from "../controllers/studentController";

export class StudentRoutes {

    private controller: StudentController = new StudentController();

    public getAllRoutes(): Router {

        const routes = Router();

        routes.route('/generate')
            .post(this.controller.generateStudents)

        return routes;
    }
}