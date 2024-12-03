export const userSQL = {
    findUsers: `SELECT * FROM user`,
    findUserById: `SELECT * FROM user WHERE user_id = ?`,
    createUser: `INSERT INTO user (firstname, lastname, email, login, password) VALUES (?, ?, ?, ?, ?)`,
    updateUserById: `UPDATE user SET firstname = ?, lastname = ?, email = ?, login = ?, password = ? WHERE user_id = ?`,
    deleteUserById: `DELETE FROM user WHERE user_id = ?`,
};

export const roleSQL = {
    findRoles: `SELECT * FROM role`,
    findRoleById: `SELECT * FROM role WHERE role_id = ?`,
    createRole: `INSERT INTO role (name) VALUES (?)`,
    updateRoleById: `UPDATE role SET name = ? WHERE role_id = ?`,
    deleteRoleById: `DELETE FROM role WHERE role_id = ?`,
};
