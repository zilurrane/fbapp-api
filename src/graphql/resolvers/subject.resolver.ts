import { getTenantBoundSubjectModel } from '../../models/subject.model';

export default {
    Query: {
        subjects: async (_parent: any, _args: any, { user }: any) => await getTenantBoundSubjectModel(user).find({}).exec(),
        subject: async (_parent: any, { id }: any, { user }: any) => await getTenantBoundSubjectModel(user).findById(id).exec()
    }
};
