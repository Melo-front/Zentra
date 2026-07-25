const express = require("express");
const router = express.Router();

const { crearPedido, traerPedidos,traerTodosPedidos,actualizarEstadoPedido } = require("../controllers/pedido.controller");
const validartoken = require("../middlewares/auth.middleware");

const validarRol = require("../middlewares/role.middleware");

router.post(
    "/",
    validartoken,
    crearPedido
);

router.get(
    "/",
    validartoken,
    traerPedidos
);

router.get(
    "/admin",
    validartoken,
    validarRol("admin"),
    traerTodosPedidos
);

router.put(
    "/:id",
    validartoken,
    validarRol("admin"),
    actualizarEstadoPedido
);

module.exports = router;