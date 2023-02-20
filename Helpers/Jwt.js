var jwt = require('jsonwebtoken');


const SECRET_KEY=process.env.SECRET_KEY
const REFRESH_KEY=process.env.REFRESH_KEY


const genAccessToken=(user)=>{
    return new Promise((resolve,reject)=>{
     if(user._id){
        resolve(
            jwt.sign({_id:user.id},SECRET_KEY, { expiresIn:"55s" })
        )
     }
    })
}

const genRefreshToken=(user)=>{
    return new Promise((resolve,reject)=>{
        if(user._id){
            resolve(
                jwt.sign({_id:user.id},REFRESH_KEY, { expiresIn:"15m" }) 
            )
        }
    })
}

module.exports = { genAccessToken,genRefreshToken };