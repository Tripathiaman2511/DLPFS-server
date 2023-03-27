const express=require('express')
const getUser= express.Router()
const User=require('../../model/User')

//get all user except admin
getUser.get('/',async(req,res)=>{
    
    User.find((err,data)=>{
        if(err) return res.send(err)
        if(!data) return res.send("Not Found")
        const filteredData=data.filter(value=>!value.isAdmin)
        res.send(filteredData)
    })
})

getUser.post('/user',async(req,res)=>{
    const username=req.body.username
    console.log(username)
    try{
        const value =await User.findOne({username:username})
        if(!value) return res.send("Not Found")
        res.send(value)
    }catch(err){
        res.send(err)
    }


})

//can user upload?
getUser.post('/upload',async(req,res)=>{
const username=req.body.username

try{
    const user=await User.findOne({username:username})
    if(user.upload.access){
        return res.status(200).send(user.upload.access)
    }
    res.send(user.upload.access)
}catch(err){
 res.send(err)   
}
}
)

//can user read?
getUser.post('/read',async(req,res)=>{
    const username=req.body.username
    
    try{
        const user=await User.findOne({username:username})
        if(user.review.access){
            return res.status(200).send(user.review.access)
        }
        res.send(user.review.access)
    }catch(err){
     res.send(err)   
    }
    }
    )
module.exports=getUser