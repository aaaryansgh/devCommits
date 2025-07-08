const mongoose=require('mongoose');
const url='mongodb+srv://singharyan1817:wO684pvF8G8vvctE@namastenode.jmpypl2.mongodb.net/devcommits'
const connectDB=async()=>{
    await mongoose.connect(url)
}
module.exports=connectDB;
