const express= require("express");
const router=express.Router();
const { creartarea, traertarea, actualizartarea, eliminartarea  } = require("../controllers/task.controller");
const validartoken=require("../middlewares/auth.middleware")

router.post("/creartarea",validartoken,creartarea);

router.get("/traertarea",validartoken,traertarea);

router.put("/:id",validartoken,actualizartarea);

router.delete("/:id",validartoken,eliminartarea);



module.exports=router;