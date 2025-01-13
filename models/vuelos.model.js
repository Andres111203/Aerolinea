import {db} from '../database/conexion_db.js'

const createVuelo = async({id_vuelo, estado, fecha_salida, fecha_llegada, valor, id_avion, id_piloto, origen, destino}) => {
    const query = {
        text: `INSERT INTO administracion.vuelos (id_vuelo, estado, fecha_salida,fecha_llegada, valor, id_avion, id_piloto, origen, destino) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) 
        RETURNING *`,
        values: [id_vuelo, estado, fecha_salida, fecha_llegada, valor, id_avion, id_piloto, origen, destino]
    }

    const {rows} = await db.query(query)
    return rows[0]
}

const findVueloById = async(id_vuelo) => {
    const query = {
        text: `SELECT * FROM administracion.vuelos WHERE id_vuelo = $1`,
        values: [id_vuelo]
    }
    const {rows} = await db.query(query)
    return rows[0]
}

const updateStateVuelo = async(id_vuelo, estado) => {
    const query = {
        text: `UPDATE administracion.vuelos 
        SET estado = $1 
        WHERE id_vuelo = $2
        RETURNING *`,
        values: [id_vuelo, estado]
    }
    try{
        const {rows} = await db.query(query)
        if(rows.rowCount === 0){
            throw new Error('No se encontró el vuelo en la base de datos')
        }
        return rows[0]
    }catch(error){
        throw new Error('Error al actualizar el estado del vuelo')
    }
}

const updateVuelo = async(id_vuelo, updatefields) => {
    const setfields = Object.keys(updatefields).map((key, index) => `${key} = $${index + 2}`).join(', ')
    const values = [id_vuelo, ...Object.values(updatefields)]

    const query = {
        text: `UPDATE administracion.vuelos 
        SET ${setfields} 
        WHERE id_vuelo = $1
        RETURNING *`,
        values: values
    }
    try{
        const {rows} = await db.query(query)
        if(rows.rowCount === 0){
            throw new Error('No se encontró el vuelo en la base de datos')
        }
        return rows[0]
    }catch(error){
        throw new Error('Error al actualizar el vuelo')
    }
    
}

const listVuelos = async () =>{
    const query = {
        text: `SELECT * FROM administracion.vuelos`
    }
    const {rows} = await db.query(query)
    return rows
}

const deleteVuelo = async(id_vuelo) => {
    const query = {
        text: `DELETE FROM administracion.vuelos 
        WHERE id_vuelo = $1 
        RETURNING *`,
        values: [id_vuelo]
    }
    try{
        const {rows} = db.query(query)
        if(rows.rowCount === 0){
            throw new Error('No se encontró el vuelo en la base de datos')
        }
    }catch(error){
        throw new Error('Error al eliminar el vuelo')
    }

}

export const VuelosModel = {
    createVuelo,
    findVueloById,
    updateStateVuelo,
    updateVuelo,
    listVuelos,
    deleteVuelo
}