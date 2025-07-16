const mongoose=require('mongoose');
const validator=require('validator');
const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        index:true
    },
    lastName: String,
    city:String,
    email:{
        type:String,
        required:true,
        unique:true, //to ensure no two users have same email
        index:true,
        lowercase:true,
        trim:true, //to remove any leading or trailing spaces
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid email format")
            }
        }
    },
    password:{
        type:String,
        required:true,
        minLength:6
    },
    age:Number,
    gender:{
        type:String,
        validate(value){
            if(!["male","female","others"].includes(value)){
                throw new Error("Invalid gender type")
            }
        }
    },
    bio:{
        type:String,
        default:"Developer"
    },
    skills:{
        type:[String]
    },
    
},{timestamps:true})

const User=mongoose.model("User",userSchema);
module.exports=User;