const express=require("express");
const requestRouter=express.Router();
const {userAuth}=require("../Middlewares/auth")
const connectionRequest=require("../models/connectionRqst");
const User = require("../models/user");

requestRouter.post("/request/send/:status/:toUserId",userAuth,async(req,res)=>{
    try{
        const {user}=req;
        const fromUser=user._id;
        const toUserId=req.params.toUserId;
        const status=req.params.status;
        
        const allowedStatus=["ignored","pending"]
        if(!allowedStatus.includes(status)){
            return res.status(400).json({message:"Invalid status code"})
        }
        const toUser=await User.findById(toUserId);
        if(!toUser){
            return res.status(404).json({message:"User not found"})
        }
        // if there is an existing connection request
        const existingRequest=await connectionRequest.findOne({
            $or:[
                {fromUserId:fromUser, toUserId},
                {fromUserId:toUserId, toUserId:fromUser}
            ]
        })
        if(existingRequest){
            return res.status(400).json({message:"Connection request already exists"})
        }
        if(toUserId===fromUser.toString()){
            return res.status(400).json({message:"You cannot send a request to yourself"})
        }
        const connectionrqst=new connectionRequest({
            fromUserId:fromUser,
            toUserId,
            status,
        })
        const data=await connectionrqst.save();
        res.status(201).json({data:data})

    }catch(err){
        res.status(500).send(err.message);
    }
})

requestRouter.post("/request/review/:status/:requestId",userAuth,async(req,res)=>{
    const {user}=req;
    try{
        const allowedStatus=["accepted","rejected"] 
        const status=req.params.status;
        if(!allowedStatus.includes(status)){
            res.send({message:"Invalid status code"})
        }
        const requestId=req.params.requestId;
        const connectionRequestData=await connectionRequest.findOne({
            _id:requestId,
            toUserId:user._id,
            status:"pending"
        })
        if(!connectionRequestData){
            return res.status(404).json({message:"Connection request not found or already processed"})
        }
        connectionRequestData.status=status;
        const data=await connectionRequestData.save();
        res.status(200).json({message:"connection request saved",data:data})



    }catch(err){
        res.send(err.message);
    }
})
module.exports=requestRouter;