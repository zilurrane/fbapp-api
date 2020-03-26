import { StudentModel, getTenantBoundStudentModel } from '../../models/Student.model';
import { tenantId } from '../../helpers/constants';

export default {
    Query: {
        students: async () => await StudentModel.find({}).exec(),
        studentsByDepartmentCodeClassCode: async (_parent: any, { departmentCode, classCode }: any) => {
            return await getTenantBoundStudentModel(tenantId).find({ departmentCode, classCode }).populate('user').exec();
        }
    }
};
