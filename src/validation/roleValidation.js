export const validateRoleFields = (data) => {
    const { name } = data;

    if (!name) {
        throw new Error('Role name is required');
    }
};
