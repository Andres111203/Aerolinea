import { Router } from "express";
import { AvionController } from "../controllers/aviones.controller.js";

const router = Router()

// /api/v1/aviones/create
router.post('/create', AvionController.agregarAvion)
router.get('/list', AvionController.findAll)
router.patch('/:id_avion', AvionController.actualizarAvion)
router.patch('/changeState/:id_avion', AvionController.cambiarEstadoAvion)
router.delete('/delete/:id_avion', AvionController.eliminarAvion)

export default router