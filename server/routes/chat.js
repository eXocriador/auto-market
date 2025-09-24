import { Router } from 'express';
import { sendMessage, getMessages } from '../controllers/chat.js';

const router = new Router();

router.post('/', sendMessage); // для надсилання повідомлення
router.get('/', getMessages);  // для отримання всіх повідомлень

export default router;
