import { FeedbackParameterModel } from '../../models/feedback-parameter.model';

export default {
    Query: {
        feedbackParameters: async () => await FeedbackParameterModel.find({}).exec(),
    },
    Mutation: {
        addFeedbackParameter: async (_parent: any, args: any) => {
            try {
                const feedbackParameterToInsert = new FeedbackParameterModel(args);
                let response = await feedbackParameterToInsert.save();
                return response;
            } catch (e) {
                return e;
            }
        }
    }
};
