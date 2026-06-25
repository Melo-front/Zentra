const express= require("express");
const router=express.Router();
const { creartarea } = require("../controllers/task.controller");
const validartoken=require("../middlewares/auth.middleware")

router.post("/creartarea",validartoken,creartarea);



module.exports=router;