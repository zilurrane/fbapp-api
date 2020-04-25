import { getTenantBoundFeedbackParameterModel } from '../../models/feedback-parameter.model';

export default {
    Query: {
        feedbackParameters: async (_parent: any, _args: any, context: any) => {
            const feedbackParameters = await getTenantBoundFeedbackParameterModel(context).find({}).exec();
            return feedbackParameters.sort(function (first: any, second: any) {
                if (first.code < second.code) { return -1; }
                if (second.code > first.code) { return 1; }
                return 0;
            });
        }
    },
    Mutation: {
        addFeedbackParameter: async (_parent: any, args: any, context: any) => {
            try {
                const feedbackParameterToInsert = new (getTenantBoundFeedbackParameterModel(context))(args);
                let response = await feedbackParameterToInsert.save();
                return response;
            } catch (e) {
                return e;
            }
        }
    }
};
