const express=require("express");
const app=express();
app.use(express.json())
const mongoose=require("mongoose")
const user=require("./user-router")
const login=require("./auth-router")
const todo=require("./todo-router")
mongoose.connect("mongodb://localhost/citymallproject")
.then(()=>console.log("connected to db"))
.catch((err)=>console.log("someerror occured",err))
app.use("/user/create",user)
app.use("/user/login",login)
app.use("/todo",todo)
const port=5000;
app.listen(port,()=>{
  console.log(`server started at port ${port}`)
})