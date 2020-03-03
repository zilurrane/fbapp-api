import { SubjectModel } from '../../models/subject.model';
import { SubjectFacultyLinkModel } from '../../models/subject-faculty-link.model';
import { FacultyModel } from '../../models/faculty.model';

export default {
    Query: {
        facultiesByDepartmentCodeClassCode: async (_parent: any, { departmentCode, classCode }: any) => {
            let facultiesByDepartmentCodeClassCode: any[] = [];
            const subjectForGivenDepartmentClass = await SubjectModel.find({ departmentCode, classCode }).exec();

            if (!subjectForGivenDepartmentClass) return facultiesByDepartmentCodeClassCode;

            await Promise.all(subjectForGivenDepartmentClass.map(async (subject: any) => {
                const subjectRecord = { subject: { id: subject['_id'], name: subject.name, code: subject.code } };
                const facultiesForGivenSubject = await SubjectFacultyLinkModel.find({ subject: subject['_id'] }).exec();
                await Promise.all(facultiesForGivenSubject.map(async (facultySubjectLink: any) => {
                    const facultyData: any = await FacultyModel.findById(facultySubjectLink.faculty).exec();
                    let faculty: any;
                    if (facultyData) {
                        faculty = { id: facultyData['_id'], name: facultyData.name, email: facultyData.email, qualification: facultyData.qualification };
                    }
                    const existingFacultySubjectRecordIndex = facultiesByDepartmentCodeClassCode.findIndex(
                        (facultySubjectRecord: any) => facultySubjectRecord.faculty.id.equals(faculty.id) && facultySubjectRecord.subject.id.equals(subjectRecord.subject.id)
                    );
                    if (existingFacultySubjectRecordIndex !== -1) {
                        facultiesByDepartmentCodeClassCode[existingFacultySubjectRecordIndex].subject.parameters.push(facultySubjectLink.parameter);
                    } else {
                        facultiesByDepartmentCodeClassCode.push({ subject: { ...subjectRecord.subject, parameters: [facultySubjectLink.parameter] }, faculty });
                    }
                }));
            }));
            return facultiesByDepartmentCodeClassCode;
        }
    }
};
