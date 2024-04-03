import { Router } from 'express';
import * as controller from '../controllers/ticket.controller.js';
import { verifyToken } from '../middlewares/verifyToken.js';
import { checkAuth } from '../middlewares/authJwt.js';

const router = Router();

router.post('/cart/:cartId', checkAuth,verifyToken, controller.generateTicket)

export default router;