const Task = require('../models').Task;
const Projects = require('../models').Projects;
const Clients = require('../models').Clients;
const { validationResult } = require('express-validator');

const Methods= {}

Methods.create = async (req, res) => {
    try{
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})
        } 
        var result = await Task.create(req.body);
        res.status(201).send(result)
    }
    catch(error){
        res.status(500).send(error.message)
    }
}

Methods.findAll = async (req, res) => {
    try{
        const user = req.query.user_id
        var condition = user ? { user_id: user } : null
        var result= await Task.findAll({ 
            where: condition,
            include : [
                {
                    model: Projects,
                    include: [Clients]
                }
            ]
        });
        // if(result.length){
             return res.send(result)
        // }
        // throw new Error("No data found")
    }
    catch(error){
        console.log(error)
        res.status(500).send(error.message)
    }
}

Methods.findOne =  async (req, res) => {
    try{
        const id = req.params.id
        var result = await Task.findByPk(id)
        // if(result){
            res.send(result)
        // }
        // throw new Error("No data found")
    }
    catch(error){
        res.status(500).send(error.message)
    }
}

Methods.update = async (req, res) => {
    try{
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})
        } 
        const id = req.params.id
        var result= await Task.update(req.body, {where: { id: id }})
        if(result == 1){
            res.send({
                message: "Updated"
            })
        }else{
            res.send({
                message: "Cannot Update"
            })
        }
    }
    catch(error){
        res.status(500).send(error.message)
    }
}

Methods.delete = async (req, res) => {
    try{
        const id = req.params.id
        var result= await Task.destroy({where: { id: id }})
        if(result == 1){
            res.send({
                message: "Deleted"
            })
        }else{
            res.send({
                message: "Cannot Update"
            })
        }
    }
    catch(error){
        res.status(500).send(error.message)
    }
    
}

module.exports = Methods;