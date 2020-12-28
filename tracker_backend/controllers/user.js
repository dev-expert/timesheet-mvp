const User = require("../models").User;
const { validationResult } = require('express-validator');

const Methods = {};

Methods.create = async (req,res) => {
    try{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        var result = await User.create(req.body)
        res.status(201).send(result)
    }
    catch(error){
        res.status(500).send(error.message)
    }
}

Methods.findAll = async (req, res) => {
    try{
        const userType= req.query.user_type
        const condition= userType ? { type: userType } : ''
        var result = await User.findAll({ where: condition })
        // if(result.length){
            return res.status(200).send(result)
        // }
        // throw new Error("No data found")
    }
    catch(error){
        res.status(500).send(error.message)
    }
}

Methods.findOne = async (req, res) => {
    try{
        var result = await User.findByPk(req.params.id)
        // if(result){
            res.send(result)
        // }
        // throw new Error('No data found')
    }
    catch(error){
        res.status(500).send(error.message)
    }
}

Methods.update = async (req, res) => {
    try{
        const id = req.params.id;
        var result = await User.update(req.body, {where: { id: id }})
        console.log("result",result)
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
        var result = await User.destroy({
                where: {
                    id: id
                }
            })
            if (result == 1) {
                res.send({
                    message: "Deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete id=${id}`
                });
            }
    }
    catch(error){
        res.status(500).send(error.message)
    }
}

module.exports = Methods;