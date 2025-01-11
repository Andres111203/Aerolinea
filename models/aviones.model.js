import {db} from '../database/conexion_db.js'

const insertarAvion = async({id_avion, modelo, fabricante, capacidad_pasajeros, anio_fabricacion, estado, descripcion})=> {
    const query = {
       
        text: `INSERT INTO administracion.aviones (id_avion, modelo, fabricante, capacidad_pasajeros, anio_fabricacion,
        estado, descripcion)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *`,
        
        values: [id_avion, modelo, fabricante, capacidad_pasajeros, anio_fabricacion, estado, descripcion]
    }
        console.log(`valores enviados ${query.values}`);
        const { rows } = await db.query(query)
        return rows[0]
}

const buscarAvionporId = async(id_avion) => {
    const query = {
        text: `SELECT * FROM administracion.aviones WHERE id_avion = $1`,
        values: [id_avion]
    }
    const {rows} = await db.query(query)
    return rows[0]
}
const visualizarAviones = async () => {
    const query = {
        text: `SELECT * FROM administracion.aviones`,
    }
    const {rows} = await db.query(query)
    return rows
}
const actualizarAvion = async({id_avion, updatefields}) => {
    const setClause = Object.keys(updatefields).map((key, index) =>` ${key} = $${index + 2}`).join(', ');
    const values = [id_avion, ...Object.values(updatefields)]

    const query = {
        text: `
            UPDATE administracion.aviones
            SET ${setClause}
            WHERE id_avion = $1
            RETURNING *
        `,
        values: values
    };
    try{
        const {rows} = await db.query(query)
        if(rows.rowCount === 0){
            throw new Error("no se encuentra el avion en la base de datos")
        }
        return rows[0];
    }catch(error){
        console.log(error)
        throw new Error("error al actualizar el avion")
    }
}

const cambiarEstado = async(id_avion, estado) =>{

    const query = {
        text: `UPDATE administracion.aviones 
        SET estado = $2 
        WHERE id_avion = $1
        RETURNING *`,
        values: [id_avion, estado]
    }
    try{
        const {rows} = await db.query(query)
        if(rows.rowCount === 0){
            throw new Error("no se encuentra el avion en la base de datos")
        }
        return rows[0]
    }catch(error){
        console.log(error)
        throw new Error("no se pudo actualizar el estado")
    }


}

const eliminarAvion = async (id_avion) => {
    const query = {
        text: `DELETE FROM administracion.aviones WHERE id_avion = $1`,
        values: [id_avion]
    }
    try{
        const {rows} = await db.query(query)
        if(rows.rowCount === 0){
            throw new Error('avion no encontrado')
        }

        return {success: true, message: 'Avion eliminado con exito'}

    } catch (error) {
        console.error('Error al eliminar el avion', error)
        throw new Error('No se pudo eliminar el avion')
    }
}

export const AvionesModel = {
    insertarAvion,
    buscarAvionporId,
    visualizarAviones,
    actualizarAvion,
    cambiarEstado,
    eliminarAvion
}