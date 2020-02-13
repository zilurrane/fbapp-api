import { Router } from "express";
import { FacultyController } from "../controllers/facultyController";

export class FacultyRoutes {

    private controller: FacultyController = new FacultyController();

    public getAllRoutes(): Router {

        const routes = Router();

        routes.route('/')
            .get(this.controller.getAllFaculties)

        routes.route('/add')
            .post(this.controller.addNewFaculty)

        routes.route('/department/:departmentCode')
            .get(this.controller.getAllFacultiesByDepartmentCode)

        routes.route('/department/:departmentCode/class/:classCode')
            .get(this.controller.getAllFacultiesByDepartmentCodeAndClassCode)

        return routes;
    }
}