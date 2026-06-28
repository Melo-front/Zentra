const { response } = require("express");

const Task=require("../models/Task")


const creartarea= async(req,res)=>{
    try{
         const tareaExiste = await Task.findOne({
            titulo: titulo,
            usuario: req.user.id
        });

        if (tareaExiste) {
            return res.status(400).json({
                msg: "Ya existe una tarea con ese título."
            });
        }


        const task=new Task({
            titulo:req.body.titulo,
            usuario:req.user.id});    
    
        await task.save();
    
        return res.status(201).json({msg:"La tarea fue creada"});
    }catch(error){
        res.status(500).json({error:`Error al crear la tarea ${error.message}`})
    }

}

const traertarea= async(req,res)=>{
    try{
        const tasks = await Task.findOne({
            usuario:req.user.id
        })
        
        res.json(tasks);
    }catch(error){
        res.status(500).json({error:`La busqueda de la tarea fallo  ${error.message}`})
    }

}


const actualizartarea= async(req,res)=>{
    try{
        const tasks = await Task.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new: true}
        )
        
        res.json(tasks);
    }catch(error){
        res.status(500).json({error:`Erro al actualizar tarea  ${error.message}`})
    }

}

const eliminartarea= async(req,res)=>{
    try{
        const tasks = await Task.findByIdAndDelete(
        )
        
        res.json("El elemento hay sido eliminado");
    }catch(error){
        res.status(500).json({error:`Erro al eliminar la tarea  ${error.message}`})
    }

}

module.exports={
    creartarea,
    traertarea,
    actualizartarea,
    eliminartarea
}