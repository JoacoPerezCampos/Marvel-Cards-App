import appModel from '../models/appModel.js';

//CRUD Methods

//Show registers
export const getAllRegisters = async (req, res) => {
    try {
        const registers = await appModel.findAll()
        res.json(register)
    } catch (error) {
        res.json( { message : error.message})
    }
}

//Show a register
export const getRegister = async (req, res) =>{
    try {
        const register = appModel.findAll({
            where:{ id:req.params.id}
        })
        res.json(register)
    } catch (error) {
        res.json( { message : error.message}) 
    }
}

//Create a register
export const createRegister = async (req, res) =>{
    try {
       await appModel.create(req.body)
       res.json({
        "message":"Añadido a Favoritos"
       })
    } catch (error) {
        res.json( { message : error.message}) 
    }
}
//Delete a register
export const deleteRegister = async (req, res) =>{
    try {
        await appModel.destroy({
            where: { id: req.params.id }
        })
        res.json({
            "message":"Eliminado de Favoritos"
        })
    } catch (error) {
        res.json( { message : error.message}) 
    }
}