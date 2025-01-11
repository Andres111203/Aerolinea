import {Router} from 'express'
import { PilotosController } from '../controllers/pilotos.controller.js'

const router = Router()

// /api/v1/pilotos/register
router.post('/register', PilotosController.agregarPiloto)

// /api/v1/pilotos/list
router.get('/list', PilotosController.findAll)

// /api/v1/pilotos/:id_piloto
router.patch('/:id_piloto', PilotosController.actualizarPiloto)

// /api/v1/pilotos/state/:id_piloto
router.patch('/state/:id_piloto', PilotosController.cambiarEstadoPiloto)

//api/v1/pilotos/:id_piloto
router.delete('/delete/:id_piloto', PilotosController.eliminarPiloto)

export default router