import { ClienteModel } from "../models/cliente.model.js";

// /api/v1/client/create
const createClient = async(req, res) =>{

    const {id_cliente, nombre_1, nombre_2, apellido_1, apellido_2, edad, telefono_1,
    telefono_2, email, numero_pasaporte} = req.body
    console.log(req.body);
    try{
        if(!id_cliente || !nombre_1 || !apellido_1 || !edad || !telefono_1 || !email || !numero_pasaporte){
            return res.status(400).json({message: "Faltan campos obligatorios"})
        }
        const client = await ClienteModel.findOneById(id_cliente)
        if(client){
            return res.status(400).json({message: "El cliente ya existe"})
        }
        const estado = 'activo'
        const newClient = await ClienteModel.create({id_cliente, nombre_1, nombre_2, apellido_1, apellido_2, edad, telefono_1,
            telefono_2, email, numero_pasaporte, estado})
        return res.status(200).json({ok: true, msg: `usuario creado ${newClient}`})
    }catch(error){
        console.log(error)
        return res.status(500).json({ok: false, msg: error})
    }
}
const readclients = async(req, res) => {
    try {
        const clients = await ClienteModel.findAll()
        return res.status(200).json(clients)
    }catch(error){
        console.log(error)
        return res.status(500).json({ok: false, msg: error})
    }
        
}
const updateClient = async(req, res) => {
    const {id_cliente} = req.params;
    const updatefields = req.body;

    const updatedClient = await ClienteModel.updateClient(id_cliente, updatefields)
    try{
        if(!id_cliente || !updatefields){
            return res.status(400).json({message: "Faltan campos obligatorios"})
        }
        const client = await ClienteModel.findOneById(id_cliente)
        if(!client){
            return res.status(404).json({message: "El cliente no existe"})
        }
        
        return res.status(200).json({ok: true, msg: `usuario actualizado`, data:updatedClient})
    }catch(error){
        console.log(error)
        return res.status(500).json({ok: false, msg: error})
    }
}
const changeState = async(req, res) => {
    const {id_cliente} = req.params
    const {estado} = req.body
    try{
        if(!id_cliente || !estado){
            return res.status(400).json({message: "Faltan campos obligatorios"})
        }
        const client = await ClienteModel.findOneById(id_cliente)
        if(!client){
            return res.status(404).json({message: "El cliente no existe"})
        }
        const updatedClient = await ClienteModel.changeStateClient(id_cliente, estado)
        return res.status(200).json({ok: true, msg: `estado actualizado`})
    }catch(error){
        console.log(error)
        return res.status(500).json({ok:false, msg:"error al actualizar el estado del cliente"})
    }
}

const getCliente = async(req, res) => {
    const {id_cliente} = req.params
    try{
        const client = await ClienteModel.findOneById(id_cliente)
        if(!client){
            return res.status(404).json({message: "El cliente no existe"})
        }
        return res.status(200).json({ok: true, msg: `cliente encontrado`, data: client})
    }catch(error){
        console.log(error)
        return res.status(500).json({ok: false, msg: "error al buscar cliente"})
    }
}
const deletecliente = async(req, res) => {
    const { id_cliente } = req.params;
    try {
        const client = await ClienteModel.findOneById(id_cliente);
        if (!client) {
            return res.status(404).json({ message: "El cliente no existe" });
        }
        const clienteDel = await ClienteModel.deleteCliente(id_cliente)
        return res.status(200).json({ ok: true, msg: `cliente eliminado ${clienteDel.nombre_1}`})
    }catch(error){
        console.log(error)
        return res.status(500).json({ok: false, msg: error})
    }
}

export const ClienteController = {
    createClient,
    updateClient,
    readclients,
    changeState,
    getCliente,
    deletecliente
}