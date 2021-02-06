import { Request, Response } from 'express';
import { TenantModel } from '../models/tenant.model';
import { getTenantBoundFeedbackParameterModel } from '../models/feedback-parameter.model';
import { feedbackParameters } from '../helpers/constants';

export class TenantController {

    public getAllTenants(req: any, res: Response) {
        const tenantdId = req.user.tenantId;
        let filterCondition = {};
        if (tenantdId !== '0') {
            filterCondition = { _id: tenantdId };
        }
        TenantModel.find(filterCondition, (err: any, response: any) => {
            if (err) {
                res.status(500).send(err);
            }
            res.status(200).json(response);
        });
    }

    public async createNewTenant(req: Request, res: Response) {
        const recordToInsert = new TenantModel(req.body);
        const response = await recordToInsert.save();
        if (response && response._id) {
            await getTenantBoundFeedbackParameterModel({ user: { tenantId: response._id } }).insertMany(feedbackParameters);
            res.status(200).json(response);
        } else {
            res.status(500).json(response);
        }
    }

    public async updateTenant(req: Request, res: Response) {
        const { query, data } = req.body;
        TenantModel(req).findOneAndUpdate(query, data, (err: any, response: any) => {
            if (err) {
                res.status(500).send(err);
            }
            res.status(200).json(response);
        });
    }
}