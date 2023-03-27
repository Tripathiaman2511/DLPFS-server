const mongoose=require('mongoose')
const FileSchema=mongoose.Schema({
    fileName:{
        type:String,
        require:true
    },
    otherData:{
        type:JSON,
        require:true
    },
    path:{
        type:String,
        require:true
    }

})

module.exports=mongoose.model('File',FileSchema)