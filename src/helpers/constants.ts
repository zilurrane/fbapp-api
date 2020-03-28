export const userRoles = [
    { value: 1, label: 'SuperAdmin' },
    { value: 2, label: 'Admin' },
    { value: 3, label: 'Principal' },
    { value: 4, label: 'Teacher' },
    { value: 5, label: 'Student' },
];

export const studentRoleValue = 5;

export const errorCodes = {
    INSERT_FAILED: 9001
}

export const tenantId = "1";

export const jwtSecretKey = '7361a1e95859907116daedcade736e6465b1440ada579bb94a3a3141ae651820'; // TODO: Implement use of process.env.JWT_SECRET

export const jwtExpiryTime = 3600;