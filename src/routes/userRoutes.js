import express from 'express';
import { getUsers, updateUserProfile } from '../controllers/userController';

const router = express.Router();

router.get('/:user_id', getUsers);
router.put('/update', updateUserProfile);

export default router;
