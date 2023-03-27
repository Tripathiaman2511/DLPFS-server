const { updateDatabase,uploadUpdate } = require("../Storage/storeFunction")
const extraction = require("./process/extraction")
const masking = require("./process/masking")
const replacement = require("./process/replacement")

const writeFunction=async (reqFile,reqData,username)=>{
  console.log(`\nNow extracting and performing ${reqData.operation.masked?'masking':'replacement'}`)
  extraction(reqFile.path,(found)=>{
    console.log("Extraction Done...")
    if(reqData.operation.masked){
      masking(found,reqData,reqFile.filename,reqFile.path,(filename,data,newPath)=>{
        console.log("Masking Done...")
        updateDatabase(filename,data,newPath,()=>{
          return uploadUpdate(username,filename)
        })
      })
    }
  
    else if(reqData.operation.replacement){
      replacement(found,reqData,reqFile.filename,reqFile.path,(filename,data,newPath)=>{
        console.log("Replacement Done...")
         updateDatabase(filename,data,newPath,()=>{
          return uploadUpdate(username,filename)
         })
      }) 
    }
   
  })
}

module.exports=writeFunction