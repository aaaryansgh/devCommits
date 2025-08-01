const express=require("express")
const chatRouter=express.Router();
const {Chat}=require("../models/chat")
const {userAuth}=require("../Middlewares/auth")

chatRouter.get("/chat/:id",userAuth, async(req,res)=>{
    const{id}=req.params;
    const{user}=req;
    const userId=user._id;
    try{
        let chat= await Chat.findOne({
                participants:{$all:[userId,id]}
        }).populate({path:"messages.senderId",select:"firstName"})
        if(!chat){
            chat=new Chat({
                participants:[userId,id],
                messages:[]
            })
        }
        await chat.save();
        res.status(200).json(chat);
    }catch(err){
        console.log(err);
        
    }
})

module.exports=chatRouter;