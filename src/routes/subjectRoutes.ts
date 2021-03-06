import { Router } from "express";
import { SubjectController } from "../controllers/subjectController";

export class SubjectRoutes {

    private controller: SubjectController = new SubjectController();

    public getAllRoutes(): Router {

        const routes = Router();

        routes.route('/')
            .get(this.controller.getAllSubjects)

        routes.route('/add')
            .post(this.controller.addNewSubject)

        routes.route('/department/:departmentCode')
            .get(this.controller.getAllSubjectsByDepartmentCode)

        routes.route('/department/:departmentCode/class/:classCode')
            .get(this.controller.getAllSubjectsByDepartmentCodeAndClassCode)

        routes.route('/link/faculty')
            .post(this.controller.addUpdateSubjectFacultyLink)

        routes.route('/link/faculty/:subjectId')
            .get(this.controller.getLinkedFacultiesBySubjectId)
        return routes;
    }
}