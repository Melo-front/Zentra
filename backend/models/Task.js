const mongoose= require('mongoose')

const taskSchema = new mongoose.Schema({
    titulo:{
        type:String,
        require:true
    },
    completado:{
        type:Boolean,
        default: false
    },
    usuario:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"

    }
})
module.exports= mongoose.model('Task', taskSchema)