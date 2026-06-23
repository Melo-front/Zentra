const jwt=require("jsonwebtoken")

module.exports=(res, req, next)=>{
    const token = req.header("Authorization");

    if(!token){
        return res.status(401).json({msg: "NO hay token"})
    }

    try{
        const decoded=jwt.verify(token, process.env.JWT_SECRET);
        req.user=decoded;
        next();
    }catch{
        return res.status(401).json({
            msg: "Token invalido"
        })

    }

}