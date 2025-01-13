import { UserController } from '../controllers/user.controller.js';

import { Router } from "express";
import {verifySupUser, verifyToken } from '../middlewares/jwt.middlewares.js';

const router = Router()
// /api/v1/user/register
router.post('/register', UserController.register)

// /api/v1/user/login
router.post('/login', UserController.logIn)
router.get('/search', UserController.searchUser)

router.get('/profile', verifyToken, verifySupUser, (req, res) => {
    res.status(200).json({ message: 'Hello, Admin!' })
})
export default router;