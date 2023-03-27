const fs=require('fs')
const mask = require('./mask')

const masking=(foundValue,reqData,filename,path,clbk)=>{
    mask(path,foundValue,(maskedValue)=>{
        if(reqData.read){
            console.log("Only returning the masked Value...")
            clbk(maskedValue)
        }else{
            console.log("Writing masked Value to new file...")
             const newPath=`Storage\\perFiles\\${filename}`
             fs.writeFileSync(`C:\\Users\\amand\\Desktop\\prototype\\server\\${newPath}`,maskedValue)
             fs.unlinkSync(path)
             clbk(filename,reqData,newPath)
        }

    })
    

    
}
module.exports=masking