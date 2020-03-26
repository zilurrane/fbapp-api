import { getTenantBoundSubjectModel } from '../../models/subject.model';
import { tenantId } from '../../helpers/constants';

export default {
    Query: {
        subjects: async () => await getTenantBoundSubjectModel(tenantId).find({}).exec(),
        subject: async (_parent: any, { id }: any) => await getTenantBoundSubjectModel(tenantId).findById(id).exec()
    }
};
