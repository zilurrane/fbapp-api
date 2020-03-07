import { Router } from "express";
import { FeedbackController } from "../controllers/feedbackController";

export class FeedbackRoutes {

    private controller: FeedbackController = new FeedbackController();

    public getAllRoutes(): Router {

        const routes = Router();

        routes.route('/add')
            .post(this.controller.addFeedback)

        return routes;
    }
}