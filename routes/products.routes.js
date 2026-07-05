const express= require("express");
const router=express.Router();
const { crearproducto,traerproducto,
    actualizarproducto,
    eliminarproducto,
    traerproductoid } = require("../controllers/products.controllers");
const validartoken=require("../middlewares/auth.middleware")
const {upload}=require("../middlewares/upload")

router.post("/crearproducto",validartoken,upload,crearproducto);

router.get("/traerproducto",validartoken,traerproducto);

router.put("/:id",validartoken,actualizarproducto);

router.delete("/:id",validartoken,eliminarproducto);

router.get("/:id", validartoken, traerproductoid);

module.exports=router;