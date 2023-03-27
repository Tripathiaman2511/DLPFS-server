const extraction = require("./process/extraction")
const masking = require("./process/masking")
const replacement = require("./process/replacement")

const ReadFunction=(fileName,modifiedOtherData,path,clbk)=>{
    
    console.log(`\nNow extracting and performing ${modifiedOtherData.operation.masked?'masking':'replacement'}`)

    extraction(path,(found)=>{
        console.log("Extraction Done...")
        if(modifiedOtherData.operation.masked){
           
            masking(found,modifiedOtherData,fileName,path,(data)=>{
                console.log("Masking Done...")
                clbk(data)
            })
        }
        else if(modifiedOtherData.operation.replacement){
            replacement(found,modifiedOtherData,fileName,path,(data)=>{
                console.log("Replacement Done...")
                clbk(data)
            })
            
        }

    })

}
module.exports=ReadFunction