export const userRoles = [
    { value: 1, label: 'SuperAdmin' },
    { value: 2, label: 'Admin' },
    { value: 3, label: 'Principal' },
    { value: 4, label: 'Teacher' },
    { value: 5, label: 'Student' },
];

export const studentRoleValue = 5;

export const teacherRoleValue = 4;

export const errorCodes = {
    INSERT_FAILED: 9001,
    AUTH_FAILED: 401
}

export const tenantId = "1";

export const jwtSecretKey = '7361a1e95859907116daedcade736e6465b1440ada579bb94a3a3141ae651820'; // TODO: Implement use of process.env.JWT_SECRET

export const jwtExpiryTime = 3600;

export const feedbackParameters = [{ isActive: true, code: 'Punctual', question: 'Punctuality in taking class and Sincerity.', type: 'NUMBER', marks: 10, options: [] }, { isActive: true, code: 'Behavior', question: 'Discipline, Attitude and Behavior towards student.', type: 'NUMBER', marks: 10, options: [] }, { isActive: true, code: 'Knowledge', question: 'Subject knowledge/Quality of course material.', type: 'NUMBER', marks: 10, options: [] }, { isActive: true, code: 'Interaction', question: 'Accessibility/Availability interaction with students inside and outside classroom.', type: 'NUMBER', marks: 10, options: [] }, { isActive: true, code: 'Teacher', question: 'Would you like this teacher to teach you again?', type: 'DROPDOWN', marks: 10, options: [{ value: '10', label: 'Yes' }, { value: '0', label: 'No' }] }, { isActive: true, code: '_Comment', question: 'Write something about your teacher.', type: 'TEXTAREA', marks: 10, options: [] }];
