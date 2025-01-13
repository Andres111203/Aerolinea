import { Router } from "express";
import { ClienteController } from "../controllers/cliente.controller.js";

const router = Router()
// /api/v1/client/create
router.post('/create', ClienteController.createClient)
// /api/v1/client/list
router.get('/list', ClienteController.readclients)
router.get('/:id_cliente', ClienteController.getCliente)

// /api/v1/client/updateState/id_cliente
router.patch('/updateState/:id_cliente', ClienteController.changeState)

// //api/v1/client/update/:id_cliente
router.patch('/update/:id_cliente', ClienteController.updateClient)

// /api/v1/client/delete/:id_cliente
router.delete('/delete/:id_cliente', ClienteController.deletecliente)
export default router