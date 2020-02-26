import { StudentModel } from '../../models/Student.model';

export default {
    Query: {
        students: async () => await StudentModel.find({}).exec(),
        studentsByDepartmentCodeClassCode: async (_parent: any, { departmentCode, classCode }: any) => await StudentModel.find({ departmentCode, classCode }).exec()
    }
};
