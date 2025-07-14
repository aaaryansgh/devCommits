const express=require("express");
const requestRouter=express.Router();
const {userAuth}=require("../Middlewares/auth")

requestRouter.post("/sendconnection",userAuth,async(req,res)=>{
    const {user}=req;
    res.send(user.firstName+"sent the request");
})
module.exports=requestRouter;