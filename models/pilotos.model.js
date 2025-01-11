import {db} from '../database/conexion_db.js'

const crearPiloto = async({id_piloto, nombre_1, nombre_2, apellido_1, apellido_2, fecha_nacimiento, telefono_1, telefono_2, email, licencia, estado}) => {
    
    const query = {
        text: `INSERT INTO administracion.pilotos (id_piloto, nombre_1, nombre_2, apellido_1, apellido_2, fecha_nacimiento,
        telefono_1, telefono_2, email, licencia, estado) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
        RETURNING *`,
        values: [id_piloto, nombre_1, nombre_2, apellido_1, apellido_2, fecha_nacimiento, telefono_1, telefono_2, email, licencia, estado]
    }
    const {rows} = await db.query(query)
    return rows[0]
}

const buscarPilotoById = async(id_piloto) => {
    const query = {
        text: `SELECT * FROM administracion.pilotos WHERE id_piloto = $1`,
        values: [id_piloto]
    }
    const {rows} = await db.query(query)
    return rows[0]
}

const actualizarPiloto = async(id_piloto, updatefields) => {
    const camposActualizar = Object.keys(updatefields).map((key, index) => `${key} = $${index + 2}`).join(', ')
    const vals = [id_piloto, ...Object.values(updatefields)]

    const query = {
        text : ` UPDATE administracion.pilotos
        SET ${camposActualizar}
        WHERE id_piloto = $1 
        RETURNING *`,
        values: vals
    };
    try{
        const {rows} = await db.query(query)
        if(rows.rowCount === 0){
            throw new Error('No se encontró el piloto en la base de datos')
        }
        return rows[0]
    }catch(error){
        console.error(error)
        throw new Error('Error al actualizar el piloto')
    }
}

const listarPilotos = async() => {
    const query = {
        text: `SELECT * FROM administracion.pilotos ORDER BY id_piloto`,
    }
    const {rows} = await db.query(query)
    return rows
}

const cambiarEstadoPiloto = async(id_piloto, estado) => {
    const query = {
        text: `UPDATE administracion.pilotos 
        SET estado = $2 
        WHERE id_piloto = $1 
        RETURNING *`,
        values: [id_piloto, estado]
    }

    try{
        const {rows} = await db.query(query)
        if(rows.rowCount === 0){
            throw new Error('No se encontró el piloto en la base de datos')
        }
        return rows[0]
    }catch(error){
        console.error(error)
        throw new Error('Error al cambiar el estado del piloto')
    }
}

const eliminarPiloto = async(id_piloto) =>{
    const query = {
        text: `DELETE FROM administracion.pilotos WHERE id_piloto = $1 RETURNING *`,
        values: [id_piloto]
    }

    try{
        const {rows} = await db.query(query)
        if(rows.rowCount === 0){
            throw new Error('No se encontró el piloto en la base de datos')
        }
        return {success: true, msg: "se elimina correctamente el piloto"}
    }catch{
        console.error(error)
        throw new Error('Error al eliminar el piloto')
    }
}
export const PilotosModel = {
    crearPiloto,
    actualizarPiloto,
    listarPilotos,
    buscarPilotoById,
    cambiarEstadoPiloto,
    eliminarPiloto
}