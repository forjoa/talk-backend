import express from 'express';
import { myChats, searchForUser, conversation, sendMessage } from '../controllers/chatController.js';

const router = express.Router();

router.get('/:id', myChats);
router.get('/search', searchForUser);
router.get('/conversation/:conversation_id', conversation);
router.post('/message', sendMessage);

export default router;
