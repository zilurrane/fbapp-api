import DateScalar from '../scalars/date';
import subjectResolver from './subject.resolver';
import studentResolver from './student.resolver';
import feedbackParameterResolver from './feedback-parameter.resolver';
import facultyResolver from './faculty.resolver';

export default {
    Date: DateScalar,
    Query: {
        ...subjectResolver.Query,
        ...studentResolver.Query,
        ...feedbackParameterResolver.Query,
        ...facultyResolver.Query,
    },
    Mutation: {
        ...feedbackParameterResolver.Mutation,
    }
};
