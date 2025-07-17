const express=require("express");
const userRouter=express.Router();
const {userAuth}=require("../Middlewares/auth");
const ConnectionRequestModel = require("../models/connectionRqst");
userRouter.get("/user/requests/recieved",userAuth,async(req,res)=>{
    const {user}=req;
    try{
        const requests=await ConnectionRequestModel.find({
            toUserId:user._id,
            status:"pending"
        }).populate("fromUserId",["firstName","lastName","bio","skills"])
        res.json({message:"Data fetched successfully",data:requests})

    }catch(err){
        res.status(500).send(err.message)
    }
})
userRouter.get("/user/requests/connected",userAuth,async(req,res)=>{
    const{user}=req;
    try{
        const requests=await ConnectionRequestModel.find({
            $or:[
                {fromUserId:user._id,status:"accepted"},
                {toUserId:user._id, status:"accepted"}
            ]
        }).populate("fromUserId",["firstName","lastName","bio","skills"])
        .populate("toUserId",["firstName","lastName","bio","skills"]);
        
        const data=requests.map((row)=>{
            if(row.fromUserId._id.toString()===user._id.toString()){
               return row.toUserId;
            }
            return row.fromUserId;
        })
        res.json({data:data})
    }catch(err){
        res.status(500).send(err.message);
    }
})

module.exports=userRouter;