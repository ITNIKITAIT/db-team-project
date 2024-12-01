export const validateUserFields = (data) => {
    const requiredFields = [
        'firstname',
        'lastname',
        'email',
        'login',
        'password',
    ];

    for (const field of requiredFields) {
        if (!data[field]) {
            throw new Error(`${field} is required`);
        }
    }
};
