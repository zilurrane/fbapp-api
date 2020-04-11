import { getTenantBoundSubjectModel } from '../../models/subject.model';

export default {
    Query: {
        subjects: async (_parent: any, _args: any, context: any) => await getTenantBoundSubjectModel(context).find({}).exec(),
        subject: async (_parent: any, { id }: any, context: any) => await getTenantBoundSubjectModel(context).findById(id).exec()
    }
};
