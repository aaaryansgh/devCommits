const express=require("express");
const app=express(); //creating an instance of express.js

app.use("/test",(req,res)=>{    //app.use() is handling all the requests
    res.send("Hello from server")
})
app.use("/",(req,res)=>{
    res.send("Home page");
    
})
app.listen(4000,()=>{
    console.log("Server is running on port 4000");
    
}); //listening on port 3000