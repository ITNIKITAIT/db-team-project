import { Router } from 'express';
import RoleController from '../controllers/RoleController.js';
const router = Router();

router.get('/all', RoleController.getRoles);
router.get('/:id', RoleController.getRoleById);
router.post('/', RoleController.createRole);
router.patch('/:id', RoleController.updateRole);
router.delete('/:id', RoleController.deleteRole);

export default router;
