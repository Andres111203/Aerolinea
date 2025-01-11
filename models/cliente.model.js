import {db} from '../database/conexion_db.js'

const create = async({id_cliente, nombre_1, nombre_2, apellido_1, apellido_2, edad, telefono_1, telefono_2, email, numero_pasaporte, estado})  => {

    const query = {
        text: `INSERT INTO clientes.clientes (id_cliente, nombre_1, nombre_2, apellido_1, apellido_2, edad, telefono_1, telefono_2, email, numero_pasaporte, estado) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) 
        RETURNING *`,
        values: [id_cliente, nombre_1, nombre_2, apellido_1, apellido_2, edad, telefono_1, telefono_2, email, numero_pasaporte, estado]
    }

    const { rows } = await db.query(query)
    return rows[0]
}

const findOneByEmail = async(email) =>{
    const query = {
        text:` SELECT * FROM clientes.clientes
                WHERE email = $1
        `,
        values: [email]
    }
    const { rows } = await db.query(query)
    return rows[0]
}

const updateClient = async(id_cliente, updatefields) =>{
    const datosActulizar = Object.keys(updatefields).map((key, index) => `${key} = $${index}`).join(', ')
    const valores = [id_cliente, ...Object.values(updatefields)]
    const query = {
        text: `UPDATE clientes.clientes 
        SET ${datosActulizar} 
        WHERE id_cliente = $1 
        RETURNING *`,
        values: valores
    }
    try{
        const { rows } = await db.query(query)
        if(rows.rowCount === 0){
            throw new Error('No se encontró el cliente')
        }
        return rows[0]
    }catch(error){
        console.log(error);
        throw new Error("error al actualizar el cliente")
    }
}

const deleteCliente = async(id_cliente) => {
    const query = {
        text: `DELETE FROM clientes.clientes 
        WHERE id_cliente = $1
        RETURNING *`,
        values: [id_cliente]
    }

    try{
        const { rows } = await db.query(query)
        if(rows.rowCount === 0){
            throw new Error('No se encontró el cliente')
        }
        return res.json({ok: true, msg: "se elimio correctamente el cliente"})
        }catch(error){
            console.log(error);
            throw new Error("error al eliminar el cliente")
        }
}
const findOneById = async(id_cliente) =>{
    const query = {
        text:` SELECT * FROM clientes.clientes
        WHERE id_cliente = $1`,
        values: [id_cliente]
    }
    const {rows} = await db.query(query)
    return rows[0]
}
const changeStateClient = async(id_cliente, estado) => {
    const query = {
        text: `UPDATE clientes.clientes
        SET estado = $2
        WHERE id_cliente = $1
        RETURNING *`,
        values: [id_cliente, estado]
    };
    try{
        const { rows } = await db.query(query)
        if(rows.rowCount === 0){
            throw new Error('No se encontró el cliente')
        }
        return rows[0]
    }catch{(error)
        console.log(error);
    }
}

const findAll = async () => {
    const query = {
        text: `SELECT * FROM clientes.clientes`
    }
    const {rows} = await db.query(query)
    return rows
}


export const ClienteModel = {
    create,
    findOneByEmail,
    updateClient,
    deleteCliente,
    findOneById,
    changeStateClient,
    findAll
}