const Project = require('../models').Projects;
const Task = require('../models').Task;
const { validationResult } = require('express-validator');

const Methods= {}

Methods.create = async (req, res) => {
    try{
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})
        } 
        var result = await Project.create(req.body)
        res.status(201).send(result)
    }
    catch(error){
        res.status(500).send(error.message)
    }
}

Methods.findAll = async (req, res) => {
    try{
        const user = req.query.user
        var condition = user ? { cliend_id: user } : null
        var result = await Project.findAll({ where : condition})
        if(result.length){
            res.send(result) 
        }
        throw new Error("No data found")
    }
    catch(error){
        res.status(500).send(error.message)
    }
}

Methods.findOne = async (req, res) => {
    try{
        const id = req.params.id
        var result = await Project.findByPk(id)
        if(result){
            res.send(result)
        }
        throw new Error("No data found")
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
        var result = await Project.update(req.body, {where: { id: id }})
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
        var result = await Project.destroy({where: { id: id }, include: [Task]})
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