import pool from '../connection.js';
import { userSQL } from '../SQL/SQL.js';
import { validateUserFields } from '../validation/userValidation.js';

class UserController {
    async getUsers(req, res) {
        try {
            const [response] = await pool.execute(userSQL.findUsers);
            res.json(response);
        } catch (error) {
            res.status(500).json(error.message);
        }
    }

    async getUserById(req, res) {
        const { id } = req.params;
        try {
            const [response] = await pool.execute(userSQL.findUserById, [id]);

            if (response.length === 0) {
                return res.status(404).json({ error: 'User not found' });
            }
            res.json(response[0]);
        } catch (error) {
            res.status(500).json(error.message);
        }
    }

    async createUser(req, res) {
        const { firstname, lastname, email, login, password } = req.body;

        try {
            validateUserFields(req.body);
            const [response] = await pool.execute(userSQL.createUser, [
                firstname,
                lastname,
                email,
                login,
                password,
            ]);

            res.status(201).json({
                message: 'User created successfully',
                user: {
                    id: response.insertId,
                    firstname,
                    lastname,
                    email,
                    login,
                },
            });
        } catch (error) {
            res.status(500).json(error.message);
        }
    }

    async updateUser(req, res) {
        const { id } = req.params;
        const { firstname, lastname, email, login, password } = req.body;

        try {
            validateUserFields(req.body);
            const [response] = await pool.execute(userSQL.updateUserById, [
                firstname,
                lastname,
                email,
                login,
                password,
                id,
            ]);
            if (response.affectedRows === 0) {
                return res.status(404).json({ error: 'User not found' });
            }
            res.json('User updated successfully');
        } catch (error) {
            res.status(500).json(error.message);
        }
    }

    async deleteUser(req, res) {
        const { id } = req.params;

        try {
            const [response] = await pool.execute(userSQL.deleteUserById, [id]);

            if (response.affectedRows === 0) {
                return res.status(404).json({ error: 'User not found' });
            }
            res.json('User deleted successfully');
        } catch (error) {
            res.status(500).json(error.message);
        }
    }
}
export default new UserController();
