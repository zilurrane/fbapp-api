import { getTenantBoundStudentModel } from '../../models/Student.model';

export default {
    Query: {
        students: async (_parent: any, _args: any, context : any) => await getTenantBoundStudentModel(context).find({}).exec(),
        studentsByDepartmentCodeClassCode: async (_parent: any, { departmentCode, classCode }: any, context : any) => {
            return await getTenantBoundStudentModel(context).find({ departmentCode, classCode }).populate('user').exec();
        }
    }
};
