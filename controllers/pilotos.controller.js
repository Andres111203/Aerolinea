import { AvionesModel } from "../models/aviones.model.js";
import { PilotosModel } from "../models/pilotos.model.js";

// /api/v1/pilotos/register
const agregarPiloto = async (req, res) => {
    const {id_piloto, nombre_1, nombre_2, apellido_1, apellido_2, fecha_nacimiento, telefono_1, telefono_2, email, licencia} = req.body
    try{
        if(!id_piloto || !nombre_1 ||  !apellido_1 || !fecha_nacimiento ||!telefono_1 || !email || !licencia){
            return res.status(400).json({message: "Faltan campos por llenar"})
        }
        const piloto = await PilotosModel.buscarPilotoById(id_piloto)
        if(piloto){
            return res.status(400).json({ok: false, msg: "El piloto ya existe en la base de datos"})
        }
        const estado = 'activo'
        const nuevoPiloto = await PilotosModel.crearPiloto({id_piloto, nombre_1, nombre_2, apellido_1, apellido_2, fecha_nacimiento, telefono_1, telefono_2, email, licencia, estado})
        return res.status(201).json({ok: true, msg: `Piloto agregado ${nuevoPiloto}`})
    }catch(error){
        console.log(error)
        return res.status(500).json({ok:false, msg: "error,al agregar ek piloto"})
    }
}

const actualizarPiloto = async (req, res) =>{
    const {id_piloto} = req.params
    const updatefields = req.body
    try{
        if(!id_piloto || !updatefields){
            return res.status(400).json({message: "Faltan campos por llenar"})
        }

        const piloto = await PilotosModel.buscarPilotoById(id_piloto)
        if(!piloto){
            return res.status(404).json({ok: false, msg: "El piloto no esta en la base de datos"})
        }

        const updatePiloto = await PilotosModel.actualizarPiloto(id_piloto, updatefields)
        return res.status(200).json({ok: true, msg: `Piloto actualizado correctamente`})
    }catch(error){
        console.log(error)
        return res.status(500).json({ok:false, msg: "error,al actualizar el piloto"})
    }
}

const findAll = async(req, res) =>{
    try{
        const pilotos = await PilotosModel.listarPilotos()
        return res.status(200).json({ok: true, msg:pilotos})
    }catch(error){
        console.log(error)
        return res.status(500).json({ok:false, msg: "error,al buscar los pilotos"})
    }
}

const cambiarEstadoPiloto = async(req, res) =>{
    try{
        const {id_piloto} = req.params
        const {estado} = req.body

        const piloto = await PilotosModel.buscarPilotoById(id_piloto)
        if(!piloto){
            return res.status(404).json({ok: false, msg: "El piloto no encontrado en la base de datos"})
        }
        const nuevoPiloto = await PilotosModel.cambiarEstadoPiloto(id_piloto, estado)
        return res.status(200).json({ok: true, msg: `Estado del piloto actualizado `})
    }catch(error){
        console.log(error)
        return res.status(500).json({ok:false, msg: "error,al cambiar el estado del piloto"})
    }
}

const eliminarPiloto = async (req, res) => {
    try {
        const { id_piloto } = req.params

        const piloto = await PilotosModel.buscarPilotoById(id_piloto)
        if (!piloto) {
            return res.status(404).json({ ok: false, msg: "El piloto no esta en la base de datos"})
        }
        const eliminarPiloto = await PilotosModel.eliminarPiloto(id_piloto)
        return res.status(200).json({ ok: true, msg: "Piloto eliminado"})

    }catch(error){
        console.log(error)
        return res.status(500).json({ok:false, msg: "error,al eliminar el piloto de la base de datos"})
    }

}
export const PilotosController = {
    agregarPiloto,
    actualizarPiloto,
    findAll,
    cambiarEstadoPiloto,
    eliminarPiloto
}