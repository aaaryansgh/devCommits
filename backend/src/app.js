const express=require("express");
const app=express(); //creating an instance of express.js
const {adminAuth}=require("./Middlewares/auth"); //importing middleware for authentication

app.use("/admin",adminAuth);

app.get("/admin/admindata",(req,res)=>{
    res.send("Admin data accessed successfully");
})
app.get("/getuser",(req,res)=>{
    throw new Error("error"); //throwing an error to test error handling
    res.send("getting data")
})
app.use("/",(err,req,res,next)=>{
    if(err){
        console.log(err.message);
        res.status(500).send("Internal Server Error: " + err.message); //handling error
    }
})


app.listen(4000,()=>{
    console.log("Server is running on port 4000");
    
}); //listening on port 3000