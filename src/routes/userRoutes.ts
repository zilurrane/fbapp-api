import { Router } from "express";
import { UserController } from "../controllers/userController";

export class UserRoutes {

    private userController: UserController = new UserController();

    public getAllRoutes(): Router {

        const routes = Router();

        routes.route('/')
            .get(this.userController.listAllNonStudentAccessibleUsers)

        routes.route('/all')
            .get(this.userController.listAllUsers)

        routes.route('/register')
            .post(this.userController.createNewUser)

        return routes;
    }
}