import 'dotenv/config'
import express from 'express'
import UserRouter from './routes/user.route.js'
import ClientRouter from './routes/cliente.route.js'
import AvionesRouter from './routes/aviones.route.js'
import PilotosRouter from './routes/pilotos.route.js'
import VuelosRouter from './routes/vuelos.route.js'
import publicRouter from './routes/public.route.js'



import path from 'path';

const app = express()
app.use(express.json())

const __dirname = import.meta.dirname
const PORT = process.env.PORT || 3000

app.use(express.static(path.join(__dirname, 'public')));

//middleware para recibir solicitudes en formato json

app.use(express.urlencoded({ extended: true }))

//redireccionar al login
app.get('/', (req, res) => {
    res.redirect('/inicio')
})

//middleware para la ruta de usuarios
app.use('/api/v1/user', UserRouter)

//middleware para la ruta de clientes
app.use('/api/v1/client', ClientRouter)

//middleware para la ruta de aviones
app.use('/api/v1/aviones', AvionesRouter)


//middleware para la ruta de los pilotos
app.use('/api/v1/pilotos', PilotosRouter)

//middleware para la ruta de vuelos
app.use('/api/v1/vuelos', VuelosRouter)


//middleware para la ruta de los archivos publicos (vistas)
app.use('/', publicRouter)

//levantando el servidor
app.listen(PORT, () => console.log(`running on port http://localhost:${PORT}`));