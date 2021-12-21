const mongoose=require("mongoose");
const todoSchema=new mongoose.Schema({
    title:{
        type:String
    }
})
const Todo=mongoose.model("Todo",todoSchema)
exports.Todo=Todo;