import { getTenantBoundStudentModel } from '../../models/Student.model';

export default {
    Query: {
        students: async (_parent: any, _args: any, { user } : any) => await getTenantBoundStudentModel(user).find({}).exec(),
        studentsByDepartmentCodeClassCode: async (_parent: any, { departmentCode, classCode }: any, { user } : any) => {
            return await getTenantBoundStudentModel(user).find({ departmentCode, classCode }).populate('user').exec();
        }
    }
};
