const express=require('express');
const {UserModel}=require('../model/user.model');
const userRouter=express.Router();

userRouter.get('/',async(req,res)=>{
  try{
    const users=await UserModel.find();
    res.json(users);
  }catch(error){
    res.status(500).json({message:error.message});
  }
});

userRouter.post('/add',async(req,res)=>{
  const user=new UserModel(req.body);
  try{
    const newUser=await user.save();
    res.status(201).json(newUser);
  }catch(error){
    res.status(400).json({message:error.message });
  }
});

userRouter.patch('/update/:id',async(req,res)=>{
  try{
    const updatedUser=await UserModel.findByIdAndUpdate(req.params.id,req.body,{
      new:true,
    });
    res.json(updatedUser);
  }catch(error){
    res.status(400).json({message:error.message});
  }
});

userRouter.delete('/delete/:id',async(req,res)=>{
  try{
    await UserModel.findByIdAndDelete(req.params.id);
    res.json({ message:'User deleted' });
  }catch(error) {
    res.status(500).json({ message:error.message});
  }
});

userRouter.get('/search',async(req,res)=>{
    try{
      const {firstName}=req.query;
  
      if(!firstName){
        return res.status(400).json({message:'First name parameter is required for search.'});
      }
  
      const users=await UserModel.find({name:{$regex:new RegExp(firstName,'i')}});
      res.json(users);
    } catch(error){
      res.status(500).json({message: error.message});
    }
  });

module.exports=userRouter;
