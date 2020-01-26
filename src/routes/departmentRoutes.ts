import { Router } from "express";
import { DepartmentController } from "../controllers/departmentController";

export class DepartmentRoutes {

    private controller: DepartmentController = new DepartmentController();

    public getAllRoutes(): Router {

        const routes = Router();

        routes.route('/')
            .get(this.controller.getAllDepartments)

        routes.route('/add')
            .post(this.controller.addNewDepartment)

        return routes;
    }
}