const mongoose= require('mongoose')

const userSchema = new mongoose.Schema({
    nombre:{
        type: String,
        require: true
    },
    email:{
        type: String,
        require: true,
        unique: true
    },
    password:{
        type:String,
        require:true
    },
    rol: {
    type: String,
    enum: ["admin", "cliente"],
    default: "cliente"
    }   
})

module.exports= mongoose.model('User', userSchema)