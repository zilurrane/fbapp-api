import { Router } from "express";
import { AuthController } from "../controllers/authController";

export class AuthRoutes {

    private authController: AuthController = new AuthController();

    public getAllRoutes(): Router {

        const routes = Router();

        routes.route('/login')
            .post(this.authController.login);

        routes.route('/account/confirm')
            .post(this.authController.confirmAccount);

        return routes;
    }
}