const User = require('../Model/userModel');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const { genAccessToken, genRefreshToken } = require('../Helpers/Jwt');


const SECRET_KEY=process.env.SECRET_KEY
const REFRESH_KEY=process.env.REFRESH_KEY


let refreshTokens = []


// User signup
const Signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!(username && email && password)) {
      return res.status(400).json({ message: "All input fields are required" });
    }

    let emailExist = await User.findOne({ email });

    if (emailExist) {
      return res.status(400).json({ message: "This email is already registered" });
    }

    const hash = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      email,
      password: hash,
    });

   const saveUser= await user.save();

    return res.status(200).json({ message: "Successfully registered",user:saveUser });
  } catch (error) {
    console.log(error, 'Signup error');
    return res.status(500).json({ message: "Internal server error" });
  }
};


//user login
const userLogin = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      if (!(email && password)) {
        return res.status(400).json({ message: "All input fields are required" });
      }
  
      let emailExist = await User.findOne({ email });
  
      if (emailExist) {
        let isMatch = await bcrypt.compare(password, emailExist.password);
  
        if (isMatch) {
          let user = emailExist;

          //Generate an access token
          const authToken=await genAccessToken(user)

          //generate a refresh token
          const refreshToken=await genRefreshToken(user)
          refreshTokens.push(refreshToken)

          return res.status(200)
          .cookie("authToken",authToken,{
            httpOnly:true,
            path:"/",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
            sameSite: "strict",
          }
          ).json({ message: "Successfully logged in", user,authToken,refreshToken});
        } else {
          return res.status(400).json({ message: "Incorrect password" });
        }
      } else {
        return res.status(400).json({ message: "Email not found" });
      }
    } catch (error) {
      console.log("Login error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };



  const refreshToken = async (req, res, next) => {
    try {
      //take refresh token from the user
      const refreshToken = req.body.token;
  
      //send error if there is no token or its invalid
      if (!refreshToken) {
        return res.status(401).json({ message: "you are not authenticated" });
      }
  
      if (!refreshTokens.includes(refreshToken)) {
        return res.status(403).json({ message: "Refresh token is not valid" });
      }
  
      jwt.verify(refreshToken, REFRESH_KEY,async(error, user) => {
        error  && console.log(error);
  
        const authToken = await genAccessToken(user);
        const newRefreshToken =await genRefreshToken(user);
  
        refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
        refreshTokens.push(newRefreshToken);
  
        res.cookie("authToken", authToken, {
            httpOnly: true,
            path: "/",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
            sameSite: "strict",
          }).json({
          accessToken: authToken,
          refreshToken: newRefreshToken,
        });
      });
    } catch (error) {
      console.log(error, "refresh token error");
    }
  };



//user logout
const userlogout=async(req,res)=>{
    try{
        const refreshToken=req.body.token
        refreshTokens=refreshTokens.filter((token) => token !== refreshToken)
        res.status(200).clearCookie("authToken").json({message:"user succesfully logout"})
    }catch(error){
        console.log(error,"user can't logout")
    }
}


const Delete=(req,res)=>{
    if(req.user._id === req.params.id){
        return res.status(200).json({message:"user hasbeen deleted"})
    }else{
      return res.status(404).json({message:"User not found"})
    }
}





module.exports={
    Signup,
    userLogin,
    refreshToken,
    userlogout,
    Delete,
}