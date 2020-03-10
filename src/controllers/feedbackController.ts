import { Request, Response } from 'express';
import { FeedbackModel } from '../models/feedback.model';
import IHttpResponse from '../interfaces/httpResponse.interface';
import { errorCodes } from '../helpers/constants';

export class FeedbackController {

    public addFeedback(req: Request, res: Response) {
        let httpResponse: IHttpResponse<any>;

        let newRecord = new FeedbackModel(req.body);

        newRecord.save((err, response) => {
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