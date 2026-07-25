const express= require("express");
const router=express.Router();
const { crearproducto,traerproducto,
    actualizarproducto,
    eliminarproducto,
    traerproductoid } = require("../controllers/products.controllers");
const validartoken=require("../middlewares/auth.middleware")
const validarRol=require("../middlewares/role.middleware")
const {upload}=require("../middlewares/upload")

router.post("/crearproducto",validartoken, validarRol("admin"),upload,crearproducto);

router.get("/traerproducto",traerproducto);

router.put("/:id",validartoken, validarRol("admin"),actualizarproducto);

router.delete("/:id",validartoken, validarRol("admin"),eliminarproducto);

router.get("/:id", validartoken, traerproductoid);


module.exports=router;