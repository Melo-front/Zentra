const { response } = require("express");
const User=require("../models/User")
const bcrypt=require('bcrypt')

const registrar = async(request,responce) =>{
    try{
    const nombre=request.body.nombre;
    const email=request.body.email;
    const password=request.body.password;

    let user = await User.findOne({email: email});
    if(user) return responce.status(400).json({msg:`El usario ${email} ya existe en la base de datos`});
    
    const hashedPassword = await bcrypt.hash(password, 10)
    
    user= new User({
        nombre: nombre,
        email: email,
        password: hashedPassword
    })
    
    await user.save();
    
    return responce.status(201).json({msg:"El usuario se ha registrado con exito"});
    
    }catch(error){
        responce.status(500).json({error:error.message})
    }
}

const login= async(req,res)=>{
    try{
        const{email , password}= req.body;
        const user = await User.findOne({email});
        if(!user) return res.status(400).json({msg: "El Usuario no existe"})
        const passwordcoicinded= await bcrypt.compare(password, user.password)
         if(!passwordcoicinded) return res.status(400).json({msg: "Contraseña incorrecta"})
         res.json({
            msg: "Inicio sesión"
         })
    }catch(error){
        res.status(500).json({error:error.message})
    }

}


module.exports={
    registrar, login
}