const socket=require("socket.io");
const {Chat}=require("../models/chat");
const ConnectionRequestModel=require("../models/connectionRqst")
const intializeSocket=(server)=>{
    const io=socket(server,{
    cors:{
        origin:"http://localhost:5173",
    }
})
io.on("connection",(socket)=>{
    //hadle events
    socket.on("joinChat",({userId,id})=>{
        const room=[userId,id].sort().join("-");
        socket.join(room)
        console.log(room);
        
    })
    socket.on("sendMessage",async({firstname,userId,id,text:newmsg})=>{
        const room=[userId,id].sort().join("-");
        try{
            const connections=await ConnectionRequestModel.findOne({
                $or:[
                {fromUserId:userId, toUserId:id,status:"accepted"},
                {fromUserId:id, toUserId:userId, status:"accepted"}
            ]
            })
            
            if(!connections){
                return socket.emit("error","You are not connected with this user")
            }

            let chat= await Chat.findOne({
                participants:{$all:[userId,id]}
            })
            if(!chat){
                chat=new Chat({
                    participants:[userId,id],
                    messages:[],
                })
            }
            chat.messages.push({
                senderId:userId,
                text:newmsg,
            })
            await chat.save();
            io.to(room).emit("messageReceived",{text:newmsg,firstname})
        }catch(err){
            console.log(err);
            
        }
        
    })
    socket.on("disconnect",()=>{

    })
})
}

module.exports=intializeSocket;