import {Router} from "express";
import path from 'path'

const router = Router()
const __dirname = import.meta.dirname
const publicPath = path.join(__dirname, '../public')

router.get('/login', (req, res) => {
    res.sendFile(publicPath + '/login.html')
})

router.get('/register', (req, res) =>{
    res.sendFile(publicPath + '/register.html')
})

router.get('/inicio', (req, res) => {
    res.redirect(publicPath + '/index.html')
})

router.get('/inicio_clientes', (req, res) => {
    res.sendFile(publicPath + '/indexClientes.html')
})

router.get('/clientes', (req, res) => {
    res.sendFile(publicPath + '/clientes.html')
})

//rutas protegidas
router.get('/profile', (req, res) => {
    res.sendFile(publicPath + '/profile.vuelos.html')
})

router.get('/aviones', (req, res) => {
    res.sendFile(publicPath + '/profile.aviones.html')
})

router.get('/clientesProtected', (req, res) => {
    res.sendFile(publicPath + '/profile.clientes.html')
})

router.get('/pilotos', (req, res) => {
    res.sendFile(publicPath + '/profile.pilotos.html')
})
export default router