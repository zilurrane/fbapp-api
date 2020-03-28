import { getTenantBoundFeedbackParameterModel } from '../../models/feedback-parameter.model';

export default {
    Query: {
        feedbackParameters: async (_parent: any, _args: any, { user } : any) => await getTenantBoundFeedbackParameterModel(user).find({}).exec(),
    },
    Mutation: {
        addFeedbackParameter: async (_parent: any, args: any, { user } : any) => {
            try {
                const feedbackParameterToInsert = new (getTenantBoundFeedbackParameterModel(user))(args);
                let response = await feedbackParameterToInsert.save();
                return response;
            } catch (e) {
                return e;
            }
        }
    }
};
