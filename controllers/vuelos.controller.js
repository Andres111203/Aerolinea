import { VuelosModel } from "../models/vuelos.model.js";
import {PilotosModel} from "../models/pilotos.model.js"
import {AvionesModel} from "../models/aviones.model.js"

//  /api/v1/vuelos/create
const agregarVuelo = async( req, res) => {
    try{
        const {id_vuelo, estado, fecha_salida, fecha_llegada, valor, id_avion, id_piloto, origen, destino} = req.body
        const pilotoBuscar = await PilotosModel.buscarPilotoById(id_piloto)
        const avionBuscar = await AvionesModel.buscarAvionporId(id_avion)
        if(!id_vuelo || !estado || !fecha_salida || !fecha_llegada || !valor || !id_avion || !id_piloto || !origen || !destino){
            return res.status(400).json({ok: false, message: "Faltan campos por llenar"})
        }
        if(!pilotoBuscar){
            return res.status(400).json({ok: false, message: `En la base de datos no existe un piloto con id: ${id_piloto}`})
        }  
        if(!avionBuscar){
            return res.status(400).json({ok: false, message: `En la base de datos no existe un avion con id: ${id_avion}`})
        }
        const id_pilotoBuscar = pilotoBuscar.id_piloto
        const id_avionBuscar = avionBuscar.id_avion
        const vuelo = await VuelosModel.createVuelo({id_vuelo, estado, fecha_salida, fecha_llegada, valor, id_avion: id_avionBuscar, id_piloto: id_pilotoBuscar, origen, destino})
        return res.status(201).json({ok: true, message: "Vuelo agregado correctamente"})
    }catch(error){
        console.log(error);
        return res.status(400).json({ok: false, message: "Error al agregar vuelo"})
    }
}


export const VuelosController = {
    agregarVuelo
}