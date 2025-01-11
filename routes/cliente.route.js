import { Router } from "express";
import { ClienteController } from "../controllers/cliente.controller.js";

const router = Router()
// /api/v1/client/create
router.post('/create', ClienteController.createClient)
router.get('/list', ClienteController.readclients)

export default router