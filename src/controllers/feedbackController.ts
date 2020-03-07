import { Request, Response } from 'express';
import { FeedbackModel } from '../models/feedback.model';

export class FeedbackController {

    public addFeedback(req: Request, res: Response) {
        let newRecord = new FeedbackModel(req.body);

        newRecord.save((err, response) => {
            if (err) {
                res.send(err);
            }
            res.json(response);
        });
    }

}