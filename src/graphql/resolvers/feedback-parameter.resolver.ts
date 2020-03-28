import { getTenantBoundFeedbackParameterModel } from '../../models/feedback-parameter.model';
import { tenantId } from '../../helpers/constants';

export default {
    Query: {
        feedbackParameters: async () => await getTenantBoundFeedbackParameterModel(tenantId).find({}).exec(),
    },
    Mutation: {
        addFeedbackParameter: async (_parent: any, args: any) => {
            try {
                const feedbackParameterToInsert = new (getTenantBoundFeedbackParameterModel(tenantId))(args);
                let response = await feedbackParameterToInsert.save();
                return response;
            } catch (e) {
                return e;
            }
        }
    }
};
