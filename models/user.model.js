import { db } from '../database/conexion_db.js';


const create = async ({email, password, role}) => {

    const query = {
        text : `INSERT INTO admin.user(email, password, role)
        VALUES ($1, $2, $3) 
        RETURNING email, role 
        `,
        values: [email, password, role]
    }
    const { rows } = await db.query(query)
    return rows[0]
}
const listarUsers = async() => {
    const query = {
        text: `SELECT * FROM admin.user`
    }
    const { rows } = await db.query(query)
    return rows
}
const findOneByEmail = async (email)  => {
    const query = {
        text: `SELECT * FROM admin.user 
        WHERE email = $1`,
        values: [email]
    }
    const { rows } = await db.query(query)
    console.log(rows[0]);
    return rows[0];
}


export const UserModel = {
    create,
    findOneByEmail
}