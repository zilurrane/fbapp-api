import { SubjectModel } from '../../models/subject.model';
import DateScalar from '../scalars/date';

export default {
    Date: DateScalar,
    Query: {
        subjects: async () => await SubjectModel.find({}).exec(),
        subject: async (_parent: any, { id }: any) => await SubjectModel.findById(id).exec()
    }
};
