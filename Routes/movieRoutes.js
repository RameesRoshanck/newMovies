const express=require('express')
const {addMovie, getMovie, getSingleMovie, updateMovie, deleteMovie } = require('../Controllers/movieController')
const router=express.Router()
const {verifyjwt}=require("../midleware/verify_jwt")
const {validate,formValidate}=require("../midleware/formvalidate")



//Add movies 
router.post('/movies',verifyjwt,formValidate,validate,addMovie)
//get movies 
router.get('/movies',verifyjwt,getMovie)
//get single movie 
router.get("/movies/:id",verifyjwt,getSingleMovie)
//update movie 
router.put("/movies/:id",verifyjwt,updateMovie)
//Delete a single movies 
router.delete("/movies/:id",verifyjwt,deleteMovie)


module.exports=router