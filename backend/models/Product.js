const mongoose= require('mongoose')

const productSchema = new mongoose.Schema({
    producto: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    marca: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true,
    },
    categoria: {
        type: String,
        enum: ["Mujer", "Hombre", "Accesorio"],
        required: true
        
    },
    precio: {
        type: Number,
        required: true,
        min: 0
    },
    cantidad: {
        type: Number,
        default: 0,
        min: 0
    },
    image: {
        type: String,
        required: true
    },
    imageName: {
        type: String,
        required: true
    },
    activo: {
        type: Boolean,
        default: true
    },
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
},
{
    timestamps: true
})
module.exports= mongoose.model('Product', productSchema)