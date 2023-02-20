const mongoose = require('mongoose');

const movieSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    director:{
        type:String,
        required:true
    },
    ReleaseDate:{
         type:Date,
         required:true
    },
    Rating:{
        type:String,
        required:true
    }
},
{timestamps: true}
)

module.exports=mongoose.model("movie",movieSchema)