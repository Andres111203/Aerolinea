import { UserController } from '../controllers/user.controller.js';

import { Router } from "express";

const router = Router()
// /api/v1/user/register
router.post('/register', UserController.register)
// /api/v1/user/login
router.post('/login', UserController.logIn)
export default router;