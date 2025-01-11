import { AvionesModel } from "../models/aviones.model.js";

//  /api/v1/aviones/create
const agregarAvion = async(req, res) => {
    try{
        const {id_avion, modelo, fabricante, capacidad_pasajeros, anio_fabricacion, descripcion} = req.body

        if(!id_avion || !modelo || !fabricante || !capacidad_pasajeros || !anio_fabricacion){
            return res.status(400).json({message: 'Faltan campos'})
        }
        const avion = await AvionesModel.buscarAvionporId(id_avion)
        if(avion){
            return res.status(400).json({message: 'El avión ya existe'})
        }
        const estado = 'activo'
        const nuevoAvion = await AvionesModel.insertarAvion({id_avion, modelo, fabricante, capacidad_pasajeros, anio_fabricacion, estado, descripcion})
        res.status(200).json({ok:true, msg:nuevoAvion})

    }catch(error){
        console.log(error);
        return res.status(500).json({ok: false, msg:"no se pudo agregar el avion"})
    }

}
const actualizarAvion = async (req, res) => {

    const { id_avion } = req.params;
    const updatefields = req.body;
    console.log(updatefields);
    try{
        const avion = await AvionesModel.buscarAvionporId(id_avion)
        console.log(`avion encontrado: ${avion}`);
        if(!avion){
            return res.status(400).json({message: 'El avión no existe'})
        }
        if(!id_avion || !updatefields){
            return res.status(400).json({message: 'Faltan campos para actualizar el avion'})
        }

        const updateAvion = await AvionesModel.actualizarAvion({id_avion, updatefields})
        res.status(200).json({ok:true, msg:"se actualiza correctamente", data:updateAvion})
    }catch(error){
        console.log(error);
        return res.status(500).json({ok: false, msg:"no se pudo actualizar el avion"})
    }
}
const findAll = async(req, res) => {
    try{
        const aviones = await AvionesModel.visualizarAviones()
        res.status(200).json({ok:true, msg:aviones})
    }catch(error){
        console.log(error);
        return res.status(500).json({ok: false, msg:"no se pudo encontrar los aviones"})
    }
}
const cambiarEstadoAvion = async (req, res) => {
    const { id_avion } = req.params;
    const {estado} = req.body
    try{
        if(!id_avion){
            return res.status(400).json({message: 'Faltan campos para cambiar el estado'})
        }
        const avion = await AvionesModel.buscarAvionporId(id_avion)
        if(!avion){
            return res.status(400).json({message: 'El avión no existe en la base de datos'})
        }
        const nuevoEstado = await AvionesModel.cambiarEstado(id_avion, estado)
        res.status(200).json({ok:true, msg:"se cambio el estado correctamente", data: nuevoEstado})
    }catch(error){
        console.log(error);
        return res.status(500).json({ok: false, msg:"no se pudo cambiar el estado del avion"})
    }

} 
const eliminarAvion = async (req, res) => {
    const {id_avion} = req.params
    if(!id_avion){
        return res.status(400).json({message: 'Faltan campos para eliminar el avion'})
    }
    const avion = await AvionesModel.eliminarAvion(id_avion)
    if(!avion){
        return res.status(400).json({message: 'El avión no existe'})
    }
    const deleteAvion = await AvionesModel.eliminarAvion(id_avion)
    res.status(200).json({ok:true, msg:"se elimina correctamente", data:deleteAvion})
}

export const AvionController = {
    agregarAvion,
    actualizarAvion,
    findAll,
    cambiarEstadoAvion,
    eliminarAvion
}