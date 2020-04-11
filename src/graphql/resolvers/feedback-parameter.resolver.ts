import { getTenantBoundFeedbackParameterModel } from '../../models/feedback-parameter.model';

export default {
    Query: {
        feedbackParameters: async (_parent: any, _args: any, context : any) => await getTenantBoundFeedbackParameterModel(context).find({}).exec(),
    },
    Mutation: {
        addFeedbackParameter: async (_parent: any, args: any, context : any) => {
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
