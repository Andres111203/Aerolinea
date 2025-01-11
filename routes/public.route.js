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
    res.sendFile(publicPath + '/index.html')
})
export default router