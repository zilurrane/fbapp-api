import { Router } from "express";
import { ClassController } from "../controllers/classController";

export class ClassRoutes {

    private controller: ClassController = new ClassController();

    public getAllRoutes(): Router {

        const routes = Router();

        routes.route('/')
            .get(this.controller.getAllClasses)

        routes.route('/add')
            .post(this.controller.addNewClass)
        
        routes.route('/department/:departmentCode')
            .get(this.controller.getAllClassesByDepartmentCode)

        return routes;
    }
}