const User=require("../models/User")
const bcrypt=require('bcrypt')

const registrar = async(request,responce) =>{
    try{
    const nombre=request.body.nombre;
    const email=request.body.email;
    const password=request.body.password;

    let user = await User.findOne({email: email});
    if(user) return responce.status(400).json({msg:`El usario ${email} ya existe en la abse de datos`});
    await user.save();
    }catch(error){
        responce.status(500).json({error:error.message})
    }
}