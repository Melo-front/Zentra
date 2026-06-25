const jwt=require("jsonwebtoken")

module.exports=(req, res, next)=>{
    const headerAutorization = req.header("Authorization");
    const token=headerAutorization.split(" ")[1];

    if(!token){
        return res.status(401).json({msg: "NO hay token"})
    }

    try{
        const decoded=jwt.verify(token, process.env.JWT_SECRET);
        req.user=decoded;
        next();
    }catch(error){
        return res.status(401).json({
            msg: `Token invalido${error.message}`
        });

    }

}