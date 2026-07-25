const express= require("express");
const { registrar, login } = require("../controllers/auth.controller");
const router=express.Router();
const {registervalidator, loginvalidator}=require("../validator/auth.validator")
const  validador= require("../middlewares/validate.middleware")

router.post('/registrar',registervalidator, validador,registrar)
router.post("/login",loginvalidator, validador, login)


module.exports=router;
