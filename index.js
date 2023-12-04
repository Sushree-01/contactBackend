const express=require("express");
const {connection}=require("./config/db");
const cors=require("cors");
const userRouter=require("./route/user.Route");

require("dotenv").config()

const app=express()
app.use(cors())
app.use(express.json())
app.use("/contacts",userRouter)

app.listen(process.env.port,async()=>{
    try{
        await connection
        console.log(`Running port ${process.env.port}`)
        console.log("connected to DB")
    }catch(err){
        console.log(err)
        console.log("something went wrong")
    }
})