
var jwt = require('jsonwebtoken');


SECRET_KEY=process.env.SECRET_KEY



const verify=(req,res,next)=>{
    const authHeaders=req.headers.authorization
    if(authHeaders){
        const token=authHeaders.split(" ")[1]

        jwt.verify(token,SECRET_KEY,(err,user)=>{
            if(err){
                return res.status(403).json({message:"Token is not Valid"})
            }
          
            req.user=user;
            next();

        })
    }else{
        res.status(401).json({message:"you are not authenticated!"})
    }
}


module.exports={verify}
