import { Request, Response } from 'express';
import { getTenantBoundFeedbackModel } from '../models/feedback.model';
import IHttpResponse from '../interfaces/httpResponse.interface';
import { errorCodes, tenantId } from '../helpers/constants';

export class FeedbackController {

    public addFeedback(req: Request, res: Response) {
        let httpResponse: IHttpResponse<any>;

        let newRecord = new (getTenantBoundFeedbackModel(req.user))(req.body);

        newRecord.save((err: any, response: any) => {
            if (err) {
                httpResponse = {
                    error: {
                        code: errorCodes.INSERT_FAILED,
                        message: "Failed to submit feedback.",
                        details: err
                    }
                };
                res.status(500).send(httpResponse);
            }
            httpResponse = {
                data: response
            }
            res.json(httpResponse);
        });
    }

}