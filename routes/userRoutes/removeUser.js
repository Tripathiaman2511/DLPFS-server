const express=require('express')
const removeUser= express.Router()
const User=require('../../model/User')

removeUser.post('/',async(req,res)=>{
    const username=req.body.username;
    try{
        const findUser = await User.findOne({username:username});
        if(!findUser) return res.send("User Not Found");
        
        const deleteUser = await User.deleteOne({username:username});
        if(!deleteUser) return res.send("Not deleted");
        res.send(deleteUser);
    }
    catch(err){
        res.send(err);
    }
})
module.exports=removeUser