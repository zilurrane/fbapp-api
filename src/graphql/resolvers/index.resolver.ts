import DateScalar from '../scalars/date';
import subjectResolver from './subject.resolver';
import studentResolver from './student.resolver';

export default {
    Date: DateScalar,
    Query: {
        ...subjectResolver.Query,
        ...studentResolver.Query
    }
};
