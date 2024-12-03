import pool from '../connection.js';
import { validateRoleFields } from '../validation/roleValidation.js';
import { roleSQL } from '../SQL/SQL.js';

class RoleController {
    async getRoles(req, res) {
        try {
            const [response] = await pool.execute(roleSQL.findRoles);
            res.json(response);
        } catch (error) {
            res.status(500).json(error.message);
        }
    }

    async getRoleById(req, res) {
        const { id } = req.params;

        try {
            const [response] = await pool.execute(roleSQL.findRoleById, [id]);

            if (response.length === 0) {
                return res.status(404).json({ error: 'Role not found' });
            }

            res.json(response[0]);
        } catch (error) {
            res.status(500).json(error.message);
        }
    }

    async createRole(req, res) {
        const { name } = req.body;

        try {
            validateRoleFields({ name });
            const [response] = await pool.execute(roleSQL.createRole, [name]);
            res.status(201).json({
                message: 'Role created successfully',
                role: { id: response.insertId, name },
            });
        } catch (error) {
            res.status(500).json(error.message);
        }
    }

    async updateRole(req, res) {
        const { id } = req.params;
        const { name } = req.body;

        try {
            validateRoleFields({ name });
            const [response] = await pool.execute(roleSQL.updateRoleById, [
                name,
                id,
            ]);

            if (response.affectedRows === 0) {
                return res.status(404).json({ error: 'Role not found' });
            }

            res.json('Role updated successfully');
        } catch (error) {
            res.status(500).json(error.message);
        }
    }

    async deleteRole(req, res) {
        const { id } = req.params;

        try {
            const [response] = await pool.execute(roleSQL.deleteRoleById, [id]);

            if (response.affectedRows === 0) {
                return res.status(404).json({ error: 'Role not found' });
            }

            res.json('Role deleted successfully');
        } catch (error) {
            res.status(500).json(error.message);
        }
    }
}

export default new RoleController();
