const mongoose = require("mongoose");

const PedidoSchema = mongoose.Schema({

    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    productos: [

        {
            producto: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product"
            },

            nombre: String,

            precio: Number,

            cantidad: Number,

            subtotal: Number
        }

    ],

    total: {
        type: Number,
        required: true
    },

    estado: {
        type: String,
        enum: ["Pendiente", "Enviado", "Entregado","Cancelado"],
        default: "Pendiente"
    }

},
{
    timestamps: true
});

module.exports = mongoose.model("Pedido", PedidoSchema);