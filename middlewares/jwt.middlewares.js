import jwt from 'jsonwebtoken'

export const verifyToken = async (req, res, next) => {
    let token = req.headers.authorization
    if (!token) {
        return res.status(401).send({ message: 'No autorizado' })
    }

    token = token.split(' ')[1]
    try{
        const {email, role} = jwt.verify(token, process.env.KEY_JWT) 
        req.email = email
        req.role = role

        next()
    }catch(error){
        return res.status(400).json({error: "token no valido"})
    }
}


export const verifySupUser = async (req, res, next) =>{
    if(req.role === 'superUsuario'){
        next()
    }
    return res.status(403).json({error: "no tienes permisos de acceso"})

}

export const verifyclient = async(req, res, next) =>{
    if(req.role == 'cliente'){
        next()
    }
    return res.status(401).json({error: "No estas registrado"})
}

