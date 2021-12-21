const express=require("express");
const route=express.Router();
const auth=require("./auth-token-middleware");
const {Todo}=require("./to-do-model");
route.get("/list",auth,async(req,res)=>{
    const result=await Todo.find()
    res.send(result);
})
route.post("/create",auth,async(req,res)=>{
 let list=new Todo({
    title:req.body.title
})
list=await list.save();
res.send(list)
})
route.delete("/delete/:id",auth,async(req,res)=>{
    const result=await Todo.findByIdAndRemove(req.params.id);
    if(!result)
        return res.status(404).send("the todo with given id is not found")
    res.send(result)
})

module.exports=route;