//create a function to store file 

const multer = require("multer")
const fs=require('fs')
const File =require('../model/File')
const User =require('../model/User')

//create storage
const createStorage=(destination)=>{
    return multer.diskStorage({
        destination:(req,file,cb)=>{
            cb(null,`Storage/${destination}`)
        },
        filename:(req,file,cb)=>{
            cb(null,Date.now()+'-'+file.originalname)
        }
    })
}

//store the metadata in mongodb
const updateDatabase=async (filename,data,newPath,clbk)=>{

    const newFile=new File({
        fileName:filename,
        otherData:data,
        path:newPath
    })
    try{
        await newFile.save()
        console.log("Updated Database Successfully.")
        clbk()
    }
    catch(err){
        return err
    }
   
}

//update the userUpload
const uploadUpdate=async (username,fileName)=>{
    try{
        const user=await User.findOne({username:username})
        if(user.upload.access){
            await User.findOneAndUpdate({username:username},{$push:{'upload.fileName':fileName}},{new:true})
            return 200
        }
        else{
            return "no Access"
        }
    }catch(err){
       return err
    }
}

module.exports={createStorage:createStorage,updateDatabase:updateDatabase,uploadUpdate:uploadUpdate}

