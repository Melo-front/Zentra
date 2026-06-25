const { response } = require("express");

const Task=require("../models/Task")


const creartarea= async(req,res)=>{
    try{
        const task=new Task({
            titulo:req.body.titulo,
            usuario:req.user.id});    
    
        await task.save();
    
        return res.status(201).json({msg:"La tarea fue creada"});
    }catch(error){
        res.status(500).json({error:`Error al crear la tarea ${error.message}`})
    }

}

module.exports={
    creartarea
}