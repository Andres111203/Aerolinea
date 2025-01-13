import { UserModel } from '../models/user.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// api/v1/user/register
const register = async (req, res) => {
    try {
        const { email, password} = req.body
        console.log("req: ", req.body.email);

        if(!email || !password){
            return res.status(400).json({message: "Todos los campos son obligatorios."})
        }

        const user = await UserModel.findOneByEmail(email)
        console.log(`usuario encontrado ${user}`);
        if(user){
            return res.status(400).json({message: "El usuario ya existe."})
        }
        
        const role = 'cliente'
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        console.log(hashedPassword)
        const nuevoUsuario = await UserModel.create({email, password: hashedPassword, role})
        console.log(nuevoUsuario);
        
        const token = jwt.sign({
            email: nuevoUsuario.email, role: nuevoUsuario.role
        },
            process.env.KEY_JWT,
            { 
                expiresIn: '1h'
            }
        )
        res.json({ok: true, msg: token})

    }catch(error){
        console.log(error);
        res.status(500).json({ ok: false, message: 'error del servidor'});
    }
}

//  /api/v1/user/logIn
const logIn = async (req, res) => {
    try{
        const {email, password} = req.body
        const usuario = await UserModel.findOneByEmail(email)

        if(!email || !password){
            return res.status(400).json({message: "Todos los campos son obligatorios."})
        }
        if(!usuario){
            return res.status(400).json({message: "El usuario no existe."})
        }

        const isMatch = await bcrypt.compare(password, usuario.password)
        if(!isMatch){
            return res.status(400).json({message: "La contraseña no es correcta."})
        }

        const token = jwt.sign({
            email: usuario.email, role: usuario.role
        },
            process.env.KEY_JWT,
            {
                "expiresIn" : "1h"
        })

        return res.status(200).json({ok: true, msg: {
            token,
            role: usuario.role
            }
        })
             

    }catch(error){
        console.log(error);
        res.status(500).json({ ok: false, message: 'error del servidor' })
    }
}

/*const profile = async (req, res) => {
    try{
        
    }catch{

    }

}*/
const searchUser = async(req, res) => {
    try{
        const {email} = req.body
        const usuario = await UserModel.findOneByEmail(email)
        if(!usuario){
            return res.status(400).json({message: "El usuario no existe."})
        }
        return res.status(200).json({ok: true, msg: usuario})
    }catch(error){
        console.log(error);
        res.status(500).json({ ok: false, message: 'error del servidor' })
    }
}

export const UserController = {
    register,
    logIn,
    searchUser
}