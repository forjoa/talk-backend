import express from 'express';
import { getOtherUsername, getUsers, updateUserProfile } from '../controllers/userController.js';

const router = express.Router();

router.get('/:user_id', getUsers);
router.put('/update', updateUserProfile);
router.post('/getOtherUsername', getOtherUsername);

export default router;
