import { Router } from 'express';
import UserController from '../controllers/UserController.js';
const router = Router();

router.get('/all', UserController.getUsers);
router.get('/:id', UserController.getUserById);
router.post('/', UserController.createUser);
router.patch('/:id', UserController.updateUser);
router.delete('/:id', UserController.deleteUser);

export default router;
