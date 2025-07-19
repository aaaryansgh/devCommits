const express=require("express");
const userRouter=express.Router();
const {userAuth}=require("../Middlewares/auth");
const ConnectionRequestModel = require("../models/connectionRqst");
const User = require("../models/user");
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

userRouter.get("/feed",userAuth,async(req,res)=>{
    
    try{
      const {user}=req;
      const page=parseInt(req.query.page)||1
      const limit=parseInt(req.query.limit)||10
      limit=limit>50?50:limit;
      const skip=(page-1)*limit;

      const connection=await ConnectionRequestModel.find({
        $or:[
            {fromUserId:user._id},{toUserId:user._id}
        ]
      }).select("fromUserId toUserId").populate("fromUserId",["firstName","lastName"])
      .populate("toUserId",["firstName","lastName"])
      const hideUsers=new Set();
      connection.forEach((req)=>{
        hideUsers.add(req.fromUserId._id.toString());
        hideUsers.add(req.toUserId._id.toString())
      })
      console.log(hideUsers);
      const userconnection=await User.find({
         $and:[
            {_id: {$nin: Array.from(hideUsers)}},
            {_id: {$ne: user._id}}
         ] //all the users who is not in the hideUsers
      }).select('firstName lastName bio skills').skip().limit(limit)
      res.json({data:userconnection})
    }catch(err){
        res.status(500).send(err.message);
    }
})
module.exports=userRouter;