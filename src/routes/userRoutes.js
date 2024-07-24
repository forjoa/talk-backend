import express from 'express';
import { getUsers, updateUserProfile } from '../controllers/userController.js';

const router = express.Router();

router.get('/:user_id', getUsers);
router.put('/update', updateUserProfile);

export default router;
