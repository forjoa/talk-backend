import express from 'express';
import { getPayload, login, register } from '../controllers/authController.js';

const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.post('/getPayload', getPayload);

export default router;
