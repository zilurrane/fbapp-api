import { Router } from "express";
import { TenantController } from "../controllers/tenantController";

export class TenantRoutes {

    private tenantController: TenantController = new TenantController();

    public getAllRoutes(): Router {

        const routes = Router();

        routes.route('/')
            .get(this.tenantController.getAllTenants)

        routes.route('/create')
            .post(this.tenantController.createNewTenant)

        return routes;
    }
}