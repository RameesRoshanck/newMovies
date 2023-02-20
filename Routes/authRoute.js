const express=require('express');
const { adminSignup, adminLogin } = require('../Controllers/adminController');
const { Signup, userLogin ,Delete, refreshToken, userlogout} = require('../Controllers/authController')
const {verify} = require('../midleware/verify_jwt');
const router=express.Router()

/* ------------------------ //user Routes and its Api ----------------------- */
router.post("/Signup",Signup)
router.post("/login",userLogin)
router.post("/refresh",refreshToken)
router.delete("/logout",verify,userlogout)
router.delete("/delete/:id",verify,Delete)


//Admin Routes
router.post("/adminSignup",adminSignup)
router.post("/adminLogin",adminLogin)



module.exports=router