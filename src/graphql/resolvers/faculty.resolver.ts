import { SubjectModel } from '../../models/subject.model';
import { SubjectFacultyLinkModel } from '../../models/subject-faculty-link.model';
import { FacultyModel } from '../../models/faculty.model';
import { FeedbackModel } from '../../models/feedback.model';
import { FeedbackParameterModel } from '../../models/feedback-parameter.model';

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
                        if (studentId) {
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
                        if (existingFacultySubjectRecordIndex !== -1) {
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
        },

        facultiesFeedbackSummary: async (_parent: any, { departmentCode, classCode }: any) => {

            const getFeedbackSum = (feedback: any) => {
                let feedbackSummary = { actual: 0, expected: 0 };
                for (let key in feedback) {
                    if (!isNaN(feedback[key])) { // This needs to be revisited
                        feedbackSummary.actual += Number(feedback[key]);
                        feedbackSummary.expected += 10; // This needs to be retrieved from config
                    }
                }
                return feedbackSummary;
            }

            let facultiesFeedbackSummary: any = [];
            const departmentClassFeedbacks: any[] = await FeedbackModel.find({ departmentCode, classCode }).exec();
            const perFacultyFeedback = departmentClassFeedbacks.reduce((acc: any, feedback: any) => {
                if (!acc[feedback.faculty]) {
                    acc[feedback.faculty] = { actual: 0, expected: 0, percentage: 0 };
                }

                const feedbackSummary = getFeedbackSum(feedback.feedback);
                acc[feedback.faculty].actual += feedbackSummary.actual;
                acc[feedback.faculty].expected += feedbackSummary.expected;
                acc[feedback.faculty].percentage = Number(((acc[feedback.faculty].actual / acc[feedback.faculty].expected) * 100).toFixed(2));
                return acc;
            }, {});

            for (let facultyId in perFacultyFeedback) {
                const faculty: any = await FacultyModel.findById(facultyId).exec();
                const facultyFeedbackSummary = { faculty, feedback: perFacultyFeedback[facultyId] };
                facultiesFeedbackSummary.push(facultyFeedbackSummary);
            }

            return facultiesFeedbackSummary;
        },

        facultyFeedback: async (_parent: any, { departmentCode, classCode, facultyId }: any) => {

            const feedbacksForGivenFaculty = await FeedbackModel.find({ departmentCode, classCode, faculty: facultyId }).exec();
            const facultyFeedbackPerParameterMap = feedbacksForGivenFaculty.reduce((acc: any, { feedback }: any) => {
                for (let feedbackParameterId in feedback) {
                    if (!isNaN(feedback[feedbackParameterId])) { // This needs to be revisited
                        if (!acc[feedbackParameterId]) {
                            acc[feedbackParameterId] = { actual: 0, expected: 0, percentage: 0 };
                        }
                        acc[feedbackParameterId].actual += feedback[feedbackParameterId];
                        acc[feedbackParameterId].expected += 10; // This needs to be retrieved from config
                        acc[feedbackParameterId].percentage = Number(((acc[feedbackParameterId].actual / acc[feedbackParameterId].expected) * 100).toFixed(2));
                    }
                }
                return acc;
            }, {});
            let facultyFeedbackPerParameter: any[] = [];
            for (let feedbackParameterId in facultyFeedbackPerParameterMap) {
                const facultyFeedbackPerParameterMapItem = facultyFeedbackPerParameterMap[feedbackParameterId];
                const parameter = await FeedbackParameterModel.findById(feedbackParameterId).exec();
                const facultyFeedbackPerParameterItem: any = {
                    parameter,
                    feedback: facultyFeedbackPerParameterMapItem
                };
                facultyFeedbackPerParameter.push(facultyFeedbackPerParameterItem);
            }
            return facultyFeedbackPerParameter;
        }

    }
};
