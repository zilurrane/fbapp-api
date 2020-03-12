import { SubjectModel } from '../../models/subject.model';
import { SubjectFacultyLinkModel } from '../../models/subject-faculty-link.model';
import { FacultyModel } from '../../models/faculty.model';
import { FeedbackModel } from '../../models/feedback.model';

export default {
    Query: {
        facultiesByDepartmentCodeClassCode: async (_parent: any, { departmentCode, classCode, studentId }: any) => {
            let facultiesByDepartmentCodeClassCode: any[] = [];
            const subjectForGivenDepartmentClass = await SubjectModel.find({ departmentCode, classCode }).exec();

            if (!subjectForGivenDepartmentClass) return facultiesByDepartmentCodeClassCode;

            await Promise.all(subjectForGivenDepartmentClass.map(async (subject: any) => {
                const subjectRecord = { subject: { id: subject['_id'], name: subject.name, code: subject.code } };
                const facultiesForGivenSubject = await SubjectFacultyLinkModel.find({ subject: subject['_id'] }).exec();
                await Promise.all(facultiesForGivenSubject.map(async (facultySubjectLink: any) => {
                    const facultyData: any = await FacultyModel.findById(facultySubjectLink.faculty).exec();
                    let faculty: any, isFeedbackSubmitted: Boolean = false;
                    if (facultyData) {
                        faculty = { id: facultyData['_id'], name: facultyData.name, email: facultyData.email, qualification: facultyData.qualification };
                        if(studentId) {
                          isFeedbackSubmitted = await FeedbackModel.exists({ student: studentId, faculty: faculty.id, fbNo: 1 });
                        }
                    }
                    const existingFacultyRecordIndex = facultiesByDepartmentCodeClassCode.findIndex(
                        (facultySubjectRecord: any) => facultySubjectRecord.faculty.id.equals(faculty.id)
                    );
                    if (existingFacultyRecordIndex !== -1) {
                        const existingFacultySubjectRecordIndex = facultiesByDepartmentCodeClassCode[existingFacultyRecordIndex].subjects.findIndex(
                            (facultySubjectRecord: any) => facultySubjectRecord.id.equals(subjectRecord.subject.id)
                        );
                        if(existingFacultySubjectRecordIndex !== -1) {
                            facultiesByDepartmentCodeClassCode[existingFacultyRecordIndex].subjects[existingFacultySubjectRecordIndex].parameters.push(facultySubjectLink.parameter);
                        }
                        else {
                            facultiesByDepartmentCodeClassCode[existingFacultyRecordIndex].subjects.push({ ...subjectRecord.subject, parameters: [facultySubjectLink.parameter] });
                        }
                    } else {
                        facultiesByDepartmentCodeClassCode.push({ subjects: [{ ...subjectRecord.subject, parameters: [facultySubjectLink.parameter] }], isFeedbackSubmitted, faculty });
                    }
                }));
            }));
            return facultiesByDepartmentCodeClassCode;
        }
    }
};
