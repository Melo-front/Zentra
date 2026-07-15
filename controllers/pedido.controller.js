const Pedido = require("../models/pedido");

const crearPedido = async (req, res) => {

    try {

        const { productos, total } = req.body;

        const pedido = new Pedido({

            usuario: req.user.id,

            productos,

            total

        });

        await pedido.save();

        return res.status(201).json({
            msg: "Pedido realizado correctamente.",
            pedido
        });

    } catch (error) {

        return res.status(500).json({
            error: `Error al crear el pedido: ${error.message}`
        });

    }

};


const traerPedidos = async (req, res) => {

    try {

        const pedidos = await Pedido.find({
            usuario: req.user.id
        }).sort({ createdAt: -1 });

        return res.status(200).json(pedidos);

    } catch (error) {

        return res.status(500).json({
            error: error.message
        });

    }

};

const traerTodosPedidos = async (req, res) => {

    try {

        const pedidos = await Pedido.find()
            .populate("usuario", "nombre email")
            .sort({ createdAt: -1 });

        return res.status(200).json(pedidos);

    } catch (error) {

        return res.status(500).json({
            error: error.message
        });

    }

};

const actualizarEstadoPedido = async (req, res) => {

    try {

        const { estado } = req.body;

        const pedido = await Pedido.findById(req.params.id);

        if (!pedido) {
            return res.status(404).json({
                msg: "El pedido no existe."
            });
        }

        pedido.estado = estado;

        await pedido.save();

        return res.status(200).json({
            msg: "Estado actualizado correctamente.",
            pedido
        });

    } catch (error) {

        return res.status(500).json({
            error: error.message
        });

    }

};
module.exports = {
    crearPedido,
    traerPedidos,
    traerTodosPedidos,
    actualizarEstadoPedido
};