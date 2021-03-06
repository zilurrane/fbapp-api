import { Router } from "express";
import { HealthCheckController } from "../controllers/healthCheckController";

export class HealthCheckRoutes {

    private healthCheckController: HealthCheckController = new HealthCheckController();

    public getAllRoutes(): Router {

        const routes = Router();

        routes.route('/ping')
            .get(this.healthCheckController.ping);

        routes.route('/email')
        .get(this.healthCheckController.sendEmail);

        return routes;
    }
}