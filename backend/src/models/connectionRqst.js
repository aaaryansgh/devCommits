const mongoose=require("mongoose");
const connecctionrequestSchema=new mongoose.Schema({
    fromUserId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
    },
    toUserId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
    },
    status:{
        type:String,
        enum:{
           values: ["ignored", "pending", "accepted", "rejected"],
           message:"{VALUE} is not a valid status"

        }
    }
},{timestamps:true})

const ConnectionRequestModel=mongoose.model("ConnectionRequestModel",connecctionrequestSchema);
module.exports=ConnectionRequestModel;