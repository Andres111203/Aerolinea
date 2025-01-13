import {Router} from 'express';
import { VuelosController} from '../controllers/vuelos.controller.js';

const router = Router()

//  /api/v1/vuelos/create
router.post('/create', VuelosController.agregarVuelo)
export default router