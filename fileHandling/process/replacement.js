const fs=require('fs')
const replace = require('./replace');

const replacement=(foundValue,reqData,filename,path,clbk)=>{
    replace(path,foundValue,(replacedValue)=>{
        if(reqData.read){
            console.log("Only reading the masked Value...")
            clbk(replacedValue)
        }else{
            console.log("Writing masked Value to new file...")
            const newPath=`Storage\\perFiles\\${filename}`
            fs.writeFileSync(`C:\\Users\\amand\\Desktop\\prototype\\server\\${newPath}`,replacedValue)
            fs.unlinkSync(path)
            clbk(filename,reqData,newPath)
        }

    })
 

}
module.exports=replacement