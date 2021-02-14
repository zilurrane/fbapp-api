import { Router } from "express";
import { TenantController } from "../controllers/tenantController";

export class TenantRoutes {

    private tenantController: TenantController = new TenantController();

    public getAllRoutes(): Router {

        const routes = Router();

        routes.route('/')
            .get(this.tenantController.getAllTenants)
            .post(this.tenantController.createNewTenant)
            .put(this.tenantController.updateTenant)

        return routes;
    }
}