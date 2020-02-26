import { SubjectModel } from '../../models/subject.model';

export default {
    Query: {
        subjects: async () => await SubjectModel.find({}).exec(),
        subject: async (_parent: any, { id }: any) => await SubjectModel.findById(id).exec()
    }
};
