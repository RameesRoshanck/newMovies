require('dotenv').config()
const express = require('express')
const ConnectDB=require('./Config/connection')
const Router=require("./Routes/movieRoutes")


const app = express()

ConnectDB()

app.use(express.json());
app.use('/api',Router)
app.use("/user",require("./Routes/authRoute"))


const PORT=process.env.PORT || 5000


app.listen(PORT,()=>{
    console.log('local host is connected')
})